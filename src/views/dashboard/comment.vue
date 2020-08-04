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
          <v-toolbar-title>قائمة التعليقات</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <!-- <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">اضافة مستخدم</v-btn>
            </template>-->
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col class="py-0" cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.username" label="اسم المستخدم" outlined></v-text-field>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.password"
                        label="كلمة المرور"
                        type="password"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="12" md="12" v-if="editedIndex === -1">
                      <v-text-field v-model="editedItem.firstName" label="الاسم الاول" outlined></v-text-field>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="12" md="12" v-if="editedIndex === -1">
                      <v-text-field v-model="editedItem.lastName" label="الاسم الثاني" outlined></v-text-field>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.email" label="البريد الالكتروني" outlined></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="close">الغاء</v-btn>
                <v-btn :loading="loadSave" color="blue darken-1" text @click="save">حفظ</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <!-- <v-icon class="ml-5" @click="editItem(item)">mdi-pencil</v-icon> -->
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
    loading: false,
    loadSave: false,
    dialog: false,
    headers: [
      {
        text: "اسم المستخدم",
        align: "start",
        value: "username"
      },
      { text: "الاسم الكامل", value: "fullName" },
      { text: "البريد الالكتروني", value: "email" },
      { text: "العمليات", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      id: ""
    },
    defaultItem: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "اضافة مستخدم" : "تعديل المستخدم";
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
  },

  methods: {
    showUsers() {
      this.loading = true;
      Axios.get("comment/all", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.$store.state.idToken
        }
      })
        .then(res => {
          this.loading = false;

          this.desserts = res.data;
          console.log(res.data);
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
        title: "هل انت متاكد من حذف التعليق ؟ ",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "لا"
      }).then(result => {
        if (result.value) {
          Axios.delete("comment?id=" + item.id, {
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
          Username: this.editedItem.username,
          Password: this.editedItem.password || "",
          FirstName: "",
          LastName: "",
          PolicyId: 1,
          Email: this.editedItem.email
        };
        Axios.put("account?id=" + this.editedItem.id, editData, {
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
              title: "تم تعديل المستخدم",
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
          Username: this.editedItem.username,
          Password: this.editedItem.password,
          FirstName: this.editedItem.firstName,
          LastName: this.editedItem.lastName,
          PolicyId: 1,
          Email: this.editedItem.email
        };
        Axios.post("account", addData, {
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
              title: "تم اضافة المستخدم",
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
