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

      <!-- <span class="black--text">12:30 - 2020-01-01</span> -->
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

    <!-- الاخبار المقطع الاول -->
    <!-- <div class="divider">
      <span></span>
      <span>الاخبار</span>
      <span></span>
    </div> -->
    <v-container>
      <v-row>
        <v-col v-for="post in posts2" :key="post.id" cols="12" sm="3">
          <v-card class="mx-auto" max-width="300">
            <v-img
              class="white--text align-end mb-3"
              height="200px"
              :src="'http://95.179.188.106/' + post.photo[0]"
            ></v-img>

            <v-card-subtitle class="px-2 blue--text">{{ post.issued }}</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ post.title }}</div>
            </v-card-text>
            <!-- <v-chip outlined class="ma-2" color="blue">
              المشاهدات
              <v-avatar right class="blue darken-4 white--text">
                13
              </v-avatar>
            </v-chip>-->
            <v-card-actions>
              <v-btn @click="toShowOne(post.id)" block color="blue" text>معاينة الخبر</v-btn>
            </v-card-actions>
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
Vue.use(VueNumber);

export default {
  props: ["id"],
  data() {
    return {
      appTitle: "Awesome App",
      sidebar: false,
      menuItems: [],
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
      text: "center",
      items: [{ title: "Click Me" }],
      posts: [],
      posts2: [],
      sections: []
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
        await this.showSection();
        await this.showPosts2();
      }
    },
    toShowOne(idPost) {
      // console.log(idPost);
      this.$router.push({ name: "onePost", params: { id: idPost } });
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
            if (this.menuItems[i].id == this.id) {
              this.menuItems[i].active = true;
            }
          }
          this.menuItems.push({ title: "الرئيسية", id: "" });
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
      Axios.get("post?SectionId=&Take=50&Skip=0", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.$store.state.idToken
        }
      })
        .then(res => {
          // this.loading = false;

          this.posts = res.data;
          //   console.log(res.data);
        })
        .catch(() => {
          // this.loading = false;
        });
    },
    showPosts2() {
      // this.loading = true;
      Axios.get(`post?SectionId=${this.id}&Take=50&Skip=0`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.$store.state.idToken
        }
      })
        .then(res => {
          // this.loading = false;

          this.posts2 = res.data;
          //   console.log(res.data);
        })
        .catch(() => {
          // this.loading = false;
        });
    }
  },
  created() {
    this.showSection();
    this.showPosts();
    this.showPosts2();
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
hr.dashed {
  border-top: 3px dashed rgb(255, 255, 255);
}
</style>
