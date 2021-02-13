<template>
  <v-row>
    <v-col cols="12" md="10" lg="8" class="offset-md-1 offset-lg-2">
      <v-form>
        <v-tabs vertical>
          <v-tab>
            <v-icon left>
              mdi-account
            </v-icon>
            Update Profile
          </v-tab>
          <v-tab>
            <v-icon left>
              mdi-mail
            </v-icon>
            Change Email
          </v-tab>
          <v-tab>
            <v-icon left>
              mdi-lock
            </v-icon>
            Change Password
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <h1 class="mt-6 mb-4">Update Profile</h1>

                <p class="mb-4">Update your profile settings below.</p>

                <v-text-field
                  v-model="newUserName"
                  maxlength="25"
                  label="New Name"
                  outlined
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="grey" @click="clearChanges()">Clear Changes</v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="primary">Update Profile</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text flat>
                <h1 class="mt-6 mb-4">Change Email</h1>

                <p class="mb-4">
                  If you would like to change your email, enter a new address in
                  the field below.
                </p>

                <v-text-field
                  v-model="newEmailAddress"
                  label="New Email Address"
                  outlined
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="grey" @click="clearChanges()">Clear Changes</v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="primary">Update Profile</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <h1 class="mt-6 mb-4">Change Password</h1>

                <p class="mb-4">
                  If you want to change your password please enter all necessary
                  information below.
                </p>

                <v-text-field
                  v-model="newPassword"
                  label="New Password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  outlined
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="grey" @click="clearChanges()">Clear Changes</v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="primary">Update Profile</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "profile",
  middleware: "authenticated",
  data() {
    return {
      newUserName: null,
      newEmailAddress: null,
      newPassword: null,
      show: false,
    };
  },
  computed: {
    ...mapState({
      authUser: state => state.authUser,
      users: state => state.users
    }),
    user() {
      const user = this.authUser;
      return this.users[user.uid];
    }
  },
  methods: {
    clearChanges() {
      this.newUserName = null
      this.newEmailAddress = null
      this.newPassword = null
      this.show = false
    }
  }
};
</script>
