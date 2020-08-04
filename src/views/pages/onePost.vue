<template>
  <div>
    <v-system-bar color="blue">
      <v-icon>mdi-news</v-icon>
      <span class="white--text">
        <marquee direction="right"
          >{{ posts[0].title }} -*- {{ posts[1].title }} -*- {{ posts[2].title }} -*-
          {{ posts[3].title }} -*- {{ posts[4].title }}</marquee
        >
      </span>
      <!-- <v-spacer></v-spacer> -->

      <!-- <span class="black--text"></span> -->
    </v-system-bar>
    <!-- اللوكو و الاعتماد -->
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" class="text-center">
          <img src="../../assets/logon.svg" width="120px" />
        </v-col>
        <v-col cols="12" sm="6">
          <h1 style="font-size:1.5rem">معتمدة لدى نقابة الصحفيين رقم الاعتماد 1809</h1>
        </v-col>
      </v-row>
    </v-container>
    <!-- الناف بار الثاني -->
    <v-navigation-drawer v-model="sidebar" app>
      <v-list nav dense>
        <v-list-item-group
          v-for="item in menuItems"
          :key="item.title"
          to="#"
          :color="item.active ? 'blue' : ''"
          :text="item.active ? false : true"
        >
          <v-list-item>
            <v-btn text @click="toSection(item.id)">{{ item.title }}</v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app flat>
      <v-toolbar-items dark class="hidden-xs-only">
        <v-btn
          :text="item.active ? false : true"
          flat
          v-for="item in menuItems"
          :key="item.title"
          :color="item.active ? 'blue' : ''"
          @click="toSection(item.id)"
          >{{ item.title }}</v-btn
        >
      </v-toolbar-items>

      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <!-- {{ appTitle }} -->
        </router-link>
      </v-toolbar-title>
      <span class="hidden-sm-and-up pr-4">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
          <v-icon large color="blue">mdi-menu-open</v-icon>
        </v-toolbar-side-icon>
      </span>
      <h1 class="hidden-sm-and-up pr-4">اضغط لرؤية الفئاة</h1>
    </v-toolbar>
    <!-- بداية البوست الواحد  -->
    <div class="divider">
      <span></span>
      <span>
        <h1>متابعة الخبر</h1>
      </span>
      <span></span>
    </div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card class="ma-auto">
            <v-img
              class="white--text align-end mb-3"
              height="500px"
              :src="'http://95.179.188.106/' + postItem.photo[0]"
            ></v-img>

            <v-card-subtitle class="blue--text">
              <h1 class="px-5" style="font-size:2rem">
                {{ postItem.title }}
              </h1>
            </v-card-subtitle>
            <br />
            <p style="font-size:1.2rem" class="px-5">
              {{ postItem.body }}
            </p>
            <v-chip outlined class="ma-2" color="blue">
              <h1>المشاهدات</h1>
              <v-avatar right class="blue darken-4 white--text">{{ postItem.views }}</v-avatar>
            </v-chip>
            <v-chip class="ma-2" color="indigo" text-color="white">
              <v-avatar left>
                <v-icon>mdi-calendar-range</v-icon>
              </v-avatar>
              <h1>{{ postItem.issued }}</h1>
            </v-chip>

            <v-chip class="ma-2" color="orange" text-color="white">
              <h1>{{ postItem.sectionName }}</h1>
              <v-icon right>mdi-star</v-icon>
            </v-chip>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- بداية التعليقات   -->
    <div class="divider">
      <span></span>
      <span>
        <h1>التعليقات</h1>
      </span>
      <span></span>
    </div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card v-for="commnt in comments" :key="commnt.id">
            <v-list-item>
              <v-list-item-avatar color="grey"></v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">{{ commnt.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ commnt.issued }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-text style="font-size:1.2rem">{{ commnt.text }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <h1 class="text-center pa-3">اضافة تعليق</h1>
            <v-container>
              <v-row>
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-text-field v-model="comment.name" label="الاسم الكامل" outlined></v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-text-field v-model="comment.contry" label=" الدولة" outlined></v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-text-field
                    v-model="comment.email"
                    label="البريد الالكتروني"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="comment.commnt"
                    label="اكتب التعليق هنا "
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn @click="sendComment" :loading="loadComment" color="blue"
                    >ارسال التعليق</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- الفوتر الاخيررررررر -->
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="blue">
          <v-container>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="4" class="text-center">
                <img src="../../assets/logon.svg" width="200px" />
                <h3 class="white--text">رئيس التحرير: احمد الفتلاوي</h3>
                <h3 class="white--text">رقم التواصل: 0780 964 0391</h3>
                <h3 class="white--text">رقم التواصل: 0771 489 1239</h3>
                <p class="white--text">
                  وكالة مستقلة ولاتنتمي لاي جهة كانت وتعمل بحيادية وموضوعية ومهنية وتنشر جميع
                  الاخبار التي تهم الجمهور
                </p>
              </v-col>
              <!-- <v-col cols="12" sm="3" class="text-center">
                <h3 class="white--text">الابواب</h3>
              </v-col>-->
              <v-col cols="12" sm="4" class="text-center">
                <h3 class="white--text">اهم المواضيع</h3>
                <hr class="dashed my-2" />

                <p class="white--text">{{ posts[0].title }}</p>
                <p class="white--text">{{ posts[1].title }}</p>
                <p class="white--text">{{ posts[2].title }}</p>
                <p class="white--text">{{ posts[3].title }}</p>
                <p class="white--text">{{ posts[4].title }}</p>
              </v-col>
              <v-col cols="12" sm="4" class="text-center">
                <h1 class="white--text">الزيارات</h1>
                <number
                  class="white--text"
                  style="font-size:2rem"
                  ref="number1"
                  :from="0"
                  :to="9243"
                  :format="theFormat"
                  :duration="5"
                  :delay="2"
                  easing="Power1.easeOut"
                />
                <br />
                <v-btn @click="emailFun" class="my-12">تواصل معنا </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} —
          <strong>وكالة الاضواء الاخبارية</strong>
          <br class="hidden-sm-and-up pr-4" />
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import Axios from "axios";
import Vue from "vue";
import VueNumber from "vue-number-animation";
import Swal from "sweetalert2";

Vue.use(VueNumber);
export default {
  props: ["id"],
  data() {
    return {
      loadComment: false,
      comments: [],
      comment: { name: "", contry: "", email: "", commnt: "" },
      sidebar: false,
      menuItems: [],
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
      text: "center",
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" }
      ],
      posts: [],
      sections: [],
      postItem: {},
      dateNow: ""
    };
  },
  methods: {
    emailFun() {
      window.open("mailto:" + "email@gmail.com");
    },
    async toSection(id) {
      console.log(id == "");
      if (!id) {
        this.$router.push("/");
      } else {
        this.$router.push({ name: "section", params: { id: id } });
      }
    },
    sendComment() {
      this.loadComment = true;
      if (this.comment.name && this.comment.contry && this.comment.email && this.comment.commnt) {
        const data = {
          Name: this.comment.name,
          Country: this.comment.contry,
          Email: this.comment.email,
          Text: this.comment.commnt,
          Issued: this.dateNow,
          PostId: this.id
        };
        Axios.post("comment", data)
          .then(() => {
            this.loadComment = false;
            this.showComment();
            Swal.fire({
              title: "تم ارسال التعليق",
              text: "",
              icon: "success",
              confirmButtonText: "اغلاق"
            });
            this.comment.name = "";
            this.comment.contry = "";
            this.comment.email = "";
            this.comment.commnt = "";
          })
          .catch(() => {
            this.loadComment = false;

            Swal.fire({
              title: "فشل ارسال التعليق",
              text: "حاول مرة اخرى",
              icon: "error",
              confirmButtonText: "اغلاق"
            });
          });
      } else {
        this.loadComment = false;

        Swal.fire({
          title: "يجب ملئ كل المعلومات",
          text: "تاكد من ملئ كل المعلومات",
          icon: "error",
          confirmButtonText: "اغلاق"
        });
      }
    },
    theFormat(number) {
      return number.toFixed(0);
    },
    completed() {
      console.log("Animation ends!");
    },
    playAnimation() {
      this.$refs.number2.play();
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
          this.menuItems = res.data;
          for (let i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].value = this.menuItems[i].id;
            this.menuItems[i].title = this.menuItems[i].name;
          }
          this.menuItems.push({ title: "الرئيسية", value: "", active: true });
          let itm = this.menuItems[0];
          this.menuItems[0] = this.menuItems[this.menuItems.length - 1];
          this.menuItems[this.menuItems.length - 1] = itm;
          // this.menuItems = this.menuItems.reverse;
          // console.log(res.data);
        })
        .catch(() => {});
    },
    showPosts() {
      // this.loading = true;
      Axios.get("post?SectionId=&Take=8&Skip=0", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.$store.state.idToken
        }
      })
        .then(res => {
          // this.loading = false;

          this.posts = res.data;
          for (let i = 0; i < this.posts.length; i++) {
            if (this.posts[i].id == this.id) {
              this.postItem = this.posts[i];
            }
          }
          //   console.log(res.data);
        })
        .catch(() => {
          // this.loading = false;
        });
    },
    showComment() {
      Axios.get("comment?PostId=" + this.id).then(res => {
        this.comments = res.data;
        console.log(this.comments);
      });
    }
  },
  created() {
    var today = new Date();
    this.dateNow = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    this.showComment();
    this.showSection();
    this.showPosts();
    Axios.put("post/view?PostId=" + this.id, {});
  }
};
</script>

<style scoped>
.divider {
  /* minor cosmetics */
  display: table;
  font-size: 24px;
  text-align: center;
  width: 75%; /* divider width */
  margin: 40px auto; /* spacing above/below */
}
.divider span {
  display: table-cell;
  position: relative;
}
.divider span:first-child,
.divider span:last-child {
  width: 50%;
  top: 13px; /* adjust vertical align */
  -moz-background-size: 100% 2px; /* line width */
  background-size: 100% 2px; /* line width */
  background-position: 0 0, 0 100%;
  background-repeat: no-repeat;
}
.divider span:first-child {
  /* color changes in here */
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(transparent), to(#2196f3));
  background-image: -webkit-linear-gradient(180deg, transparent, #2196f3);
  background-image: -moz-linear-gradient(180deg, transparent, #2196f3);
  background-image: -o-linear-gradient(180deg, transparent, #2196f3);
  background-image: linear-gradient(90deg, transparent, #2196f3);
}
.divider span:nth-child(2) {
  color: #000;
  padding: 0px 5px;
  width: auto;
  white-space: nowrap;
}
.divider span:last-child {
  /* color changes in here */
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#2196f3), to(transparent));
  background-image: -webkit-linear-gradient(180deg, #2196f3, transparent);
  background-image: -moz-linear-gradient(180deg, #2196f3, transparent);
  background-image: -o-linear-gradient(180deg, #2196f3, transparent);
  background-image: linear-gradient(90deg, #2196f3, transparent);
}
</style>
