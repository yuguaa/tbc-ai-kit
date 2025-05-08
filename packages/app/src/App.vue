<script>
import TbcAiApp from "@/components/AiApp/index.vue";

export default {
  components: {
    TbcAiApp,
  },
  props: {
    config: {
    },
    __mounted: {
      type: Function,
      default: () => { },
    },
    __unmounted: {
      type: Function,
      default: () => { },
    },
  },
  data() {
    return {
      tbcAiApp: null,
    };
  },
  mounted() { },
  methods: {
    init(tbcAiApp) {
      this.tbcAiApp = tbcAiApp;
    },
  },
  render(h) {
    return h(TbcAiApp, {
      props: {
        config: this.config,
        __mounted: this.__mounted,
        __unmounted: this.__unmounted,
      },
      ref: "tbcAiAppRef",
    })
  }
};
</script>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background: white;
}
</style>
