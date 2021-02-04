<template>
  <v-card width="480" light tile elevation="0">
    <v-navigation-drawer permanent width="480">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            The Location
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-expansion-panels multiple>
        <v-expansion-panel>
          <v-expansion-panel-header>The name of the first entry.</v-expansion-panel-header>
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            accumsan pretium ornare. Vivamus nisi odio, tempus id enim in,
            fringilla feugiat nisl. Phasellus consequat lacinia felis, sit amet
            pulvinar massa consequat sed. Sed faucibus, neque facilisis aliquam
            pulvinar, arcu quam venenatis nunc, sed rhoncus mi sapien ac nisl.
            Vivamus sed commodo ligula. Morbi eu nunc est. Nam pretium lacinia
            ligula, et luctus sapien sollicitudin eu. Phasellus ante mi, porta a
            aliquam ac, porta quis felis.
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>The name of the second entry.</v-expansion-panel-header>
          <v-expansion-panel-content>
            Aenean tristique fringilla lobortis. Quisque ac arcu vehicula dolor
            finibus euismod. Nulla porttitor at ligula at volutpat. Aliquam
            suscipit volutpat lorem, euismod tempus ipsum rhoncus quis. Aliquam
            tristique neque quis nulla convallis tincidunt. Nam a neque diam.
            Aliquam elementum vehicula ligula ac luctus. Etiam consequat
            sollicitudin odio et consequat. Ut dictum fringilla purus, nec
            condimentum ligula blandit vitae. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia curae; Donec nulla
            justo, pulvinar ullamcorper luctus at, placerat non ligula.
            Suspendisse gravida odio sit amet interdum eleifend. Nullam lacinia
            ligula ut lacus tempor, sed vehicula massa congue. Mauris vel tempus
            nisl. Donec a justo nibh. Donec dictum, ligula eu scelerisque
            cursus, lorem ex dictum arcu, et sollicitudin est libero ac libero.
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>The name of the third entry.</v-expansion-panel-header>
          <v-expansion-panel-content>
            Aliquam justo est, suscipit interdum auctor nec, aliquet et erat.
            Nunc vitae dapibus ante, id fermentum tellus. Donec tincidunt tellus
            orci, nec posuere lectus convallis eu. Ut maximus nisi in nulla
            vehicula facilisis. Pellentesque imperdiet orci eu leo accumsan
            fringilla. Nullam massa turpis, tristique nec libero nec, lobortis
            dignissim ligula. Duis at fermentum nibh, quis pharetra urna.
            Quisque bibendum lorem nisi, et tristique mi feugiat et. Nullam
            aliquet volutpat nibh, sit amet ullamcorper libero interdum eget.
            Proin a mi id tellus rhoncus finibus ac et arcu. Fusce auctor ligula
            semper neque sodales, vel ultricies tortor tempor. Sed urna ipsum,
            suscipit nec dui quis, pellentesque molestie metus. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Pellentesque eu tempus risus, sed aliquet purus. Nulla
            facilisi. Suspendisse porta lacus vitae justo pellentesque, ut
            venenatis lacus aliquet.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" }
      ],
      right: null
    };
  }
};
</script>

<style></style>
