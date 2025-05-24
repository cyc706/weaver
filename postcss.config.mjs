const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-px-to-viewport": {
      unitToConvert: "px", // 需要转换的单位
      viewportWidth: 375, // 设计稿宽度（如 750px 设计稿）
      unitPrecision: 5, // 转换后保留的小数位数
      propList: ["*"], // 需要转换的 CSS 属性（* 表示全部）
      viewportUnit: "vw", // 转换后的单位
      fontViewportUnit: "vw", // 字体转换后的单位
      selectorBlackList: [], // 不转换的 CSS 选择器（如 .ignore）
      minPixelValue: 1, // 最小转换像素值（小于此值不转换）
      mediaQuery: false, // 是否转换媒体查询中的 px
      replace: true, // 直接替换原值而非添加备用值
      exclude: /node_modules/, // 排除第三方库
    },
  },
};

export default config;
