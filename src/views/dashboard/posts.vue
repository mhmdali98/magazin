<template>
  <v-container id="dashboard" fluid tag="section">
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="firstName"
      class="elevation-1"
      :loading="loading"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>قائمة الاخبار</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">اضافة خبر</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col class="py-0" cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.title" label="عنوان الخبر" outlined></v-text-field>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="12" md="12">
                      <v-textarea
                        outlined
                        name="input-7-4"
                        label="اكتب الخبر هنا"
                        v-model="editedItem.body"
                      ></v-textarea>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.date"
                        label="تاريخ الخبر"
                        type="date"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.link" label="رابط الخبر" outlined></v-text-field>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="12" md="12" v-if="editedIndex === -1">
                      <v-file-input
                        accept="image/*"
                        v-model="file"
                        color="primary accent-4"
                        label="اختر الصورة"
                        placeholder="اختر صورة الخبر"
                        prepend-icon="mdi-paperclip"
                        outlined
                      ></v-file-input>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="12" md="12">
                      <v-select
                        :items="items"
                        v-model="editedItem.sectionId"
                        label="اختر الفئة"
                        outlined
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="close">الغاء</v-btn>
                <v-btn :loading="loadSave" color="blue darken-1" text @click="uploadImg">حفظ</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:no-data>
        <h3>لاتوجد بيانات لعرضها</h3>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="ml-5" @click="editItem(item)">mdi-pencil</v-icon>
        <!-- <v-divider class="my-1 " inset vertical></v-divider> -->

        <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">اعادة تحميل</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Axios from "axios";
import Swal from "sweetalert2";

export default {
  data: () => ({
    img_path: "",
    items: [],
    file: [],
    loading: false,
    loadSave: false,
    dialog: false,
    headers: [
      {
        text: "عنوان الخبر",
        align: "start",
        value: "title"
      },
      { text: " الفئة", value: "sectionName" },
      { text: " تاريخ النشر", value: "issued" },
      { text: " المشاهدات", value: "views" },
      { text: "العمليات", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      body: "",
      date: "",
      link: "",
      sectionId: "",
      id: ""
    },
    defaultItem: {
      title: "",
      body: "",
      date: "",
      link: "",
      sectionId: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "اضافة خبر" : "تعديل الخبر";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
    this.showUsers();
    this.showSection();
  },

  methods: {
    uploadImg() {
      if (this.file) {
        this.loadSave = true;
        console.log(this.file);
        const formData = new FormData();
        formData.append("file", this.file);

        Axios.post("upload", formData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + this.$store.state.idToken
          }
        })
          .then(data => {
            console.log(data.data);
            this.img_path = data.data.path;
            this.save();
          })
          .catch(() => {
            this.loadSave = false;
            // Swal.fire("خطا في رفع الصورة");
            this.save();
          });
      } else {
        // Swal.fire({
        //   title: "يجب اختيار صورة ",
        //   icon: "error",
        //   confirmButtonText: "اغلاق"
        // });
        this.save();
      }
    },
    showSection() {
      Axios.get("section?Take=100&Skip=0", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.$store.state.idToken
        }
      })
        .then(res => {
          this.items = res.data;
          for (let i = 0; i < this.items.length; i++) {
            this.items[i].value = this.items[i].id;
            this.items[i].text = this.items[i].name;
          }
          console.log(res.data);
        })
        .catch(() => {});
    },
    showUsers() {
      this.loading = true;
      Axios.get("post?SectionId=&Take=1000&Skip=0", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.$store.state.idToken
        }
      })
        .then(res => {
          this.loading = false;

          this.desserts = res.data;
          //   console.log(res.data);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    initialize() {
      this.showUsers();
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      //   const index = this.desserts.indexOf(item);
      Swal.fire({
        title: "هل انت متاكد من حذف الخبر ؟ ",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "لا"
      }).then(result => {
        if (result.value) {
          Axios.delete("post?id=" + item.id, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + this.$store.state.idToken
            }
          })
            .then(() => {
              Swal.fire("تم الحذف", "تمت عملية الحذ بنجاح", "success");
              this.showUsers();
            })
            .catch(() => {
              Swal.fire("لم يتم الحذف", "لم تمت عملية الحذف بنجاح", "error");
            });
        }
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.loadSave = true;
      if (this.editedIndex > -1) {
        // Object.assign(this.desserts[this.editedIndex], this.editedItem);
        const editData = {
          Title: this.editedItem.title,
          Body: this.editedItem.body,
          Photo: [],
          Link: this.editedItem.link,
          Issued: this.editedItem.date,
          SectionId: this.editedItem.sectionId
        };
        Axios.put("post?id=" + this.editedItem.id, editData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + this.$store.state.idToken
          }
        })
          .then(() => {
            this.loadSave = false;
            this.showUsers();
            this.close();
            Swal.fire({
              title: "تم تعديل الخبر",
              text: "",
              icon: "success",
              confirmButtonText: "اغلاق"
            });
          })
          .catch(() => {
            this.loadSave = false;

            Swal.fire({
              title: "تاكد من ملى المعلومات",
              text: "",
              icon: "error",
              confirmButtonText: "اغلاق"
            });
          });
      } else {
        const addData = {
          Title: this.editedItem.title,
          Body: this.editedItem.body,
          Photo: [this.img_path],
          Link: [this.editedItem.link],
          Issued: this.editedItem.date,
          SectionId: this.editedItem.sectionId
        };
        Axios.post("post", addData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + this.$store.state.idToken
          }
        })
          .then(() => {
            this.loadSave = false;
            this.showUsers();
            this.close();
            Swal.fire({
              title: "تم اضافة الخبر",
              text: "",
              icon: "success",
              confirmButtonText: "اغلاق"
            });
          })
          .catch(() => {
            this.loadSave = false;

            Swal.fire({
              title: "تاكد من ملى المعلومات",
              text: "",
              icon: "error",
              confirmButtonText: "اغلاق"
            });
          });
      }
    }
  }
};
</script>

<style></style>
