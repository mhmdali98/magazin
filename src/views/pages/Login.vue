<template>
  <v-container id="login" fill-height tag="section">
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card color="blue" light max-width="100%" width="400" class="px-5 py-3">
          <template v-slot:heading>
            <div class="text-center">
              <!-- <v-icon v-text="social.icon" /> -->
              <img src="../../assets/logon.svg" width="100px" />
              <h1 class="display-2 font-weight-bold mb-2"></h1>
            </div>
          </template>

          <v-card-text class="text-center">
            <div class="text-center grey--text body-1 font-weight-light"></div>

            <v-text-field
              color="secondary"
              label="اسم المستخدم"
              prepend-icon="mdi-face"
              class="mt-10"
              v-model="username"
            />

            <!-- <v-text-field color="secondary" label="Email..." prepend-icon="mdi-email" /> -->

            <v-text-field
              class="mb-8"
              color="secondary"
              label="كلمة المرور"
              prepend-icon="mdi-lock-outline"
              v-model="password"
              type="password"
            />

            <pages-btn
              :loading="loading"
              @click="login"
              large
              color
              depressed
              class="v-btn--text blue--text"
              >تسجيل الدخول</pages-btn
            >
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "PagesLogin",

  components: {
    PagesBtn: () => import("./components/Btn")
  },

  data: () => ({
    username: "",
    password: "",
    loading: false
  }),

  methods: {
    login() {
      this.loading = true;
      const data = {
        Username: this.username,
        Password: this.password
      };
      axios
        .post("auth", data)
        .then(res => {
          this.loading = false;
          // console.log(res);
          this.$store.dispatch("login", res.data.result);
          this.$router.push("/admin/dashboard");
        })
        .catch(err => {
          this.loading = false;

          Swal.fire({
            title: "اسم المستخدم او كلمة المرور خطا",
            text: "",
            icon: "error",
            confirmButtonText: "اغلاق"
          });

          console.log(err);
        });
    }
  },
  created() {
    this.$store.dispatch("logout");
  }
};
</script>
