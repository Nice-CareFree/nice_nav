
const sitemap = {
    hostname: "http://www.baidu.com/",//网站的网址
    cacheTime: 1,
    routes: async () => {
        //     // 静态路由
        let routes = [
            // 首页
            {
                url: `/`,
                lastmod: new Date(),
                priority: 1,
            },
            // 产品中心

        ];

        // 以下都是动态路由
        // let axiosUrl = "你的接口请求前缀";  // 示例 "http://www.baidu.com/api/"
        // let prodRoutes = [];
        // let newsRoutes = [];
        //
        // // 并发调接口
        // let [productList, newsList] = await Promise.all([
        //     all_web(),
        //     all_soft()
        //
        // ]);
        //
        // // 商品详情
        // if (productList.data.code == 20000) {
        //     let proList = productList.data.rows;
        //     prodRoutes = proList.map((item) => {
        //         return {
        //             url: `/product/twoPage/threePage?id=${item.id}`,
        //             changefred: "daily",
        //             lastmod: new Date(),
        //             priority: 1,
        //         };
        //     });
        // } else {
        //     console.log(productList.data.msg, "sitemap调用错误");
        // }
        //
        // // 文章详情
        // if (newsList.data.code == 20000) {
        //     let newsArr = newsList.data.rows;
        //     newsRoutes = newsArr.map((item) => {
        //         return {
        //             url: `/pressCenter/article?id=${item.id}`,
        //             changefred: "daily",
        //             lastmod: new Date(),
        //             priority: 1,
        //         };
        //     });
        // } else {
        //     console.log(newsList.data.msg, "sitemap调用错误");
        // }
        //
        // return routes.concat(prodRoutes, newsRoutes);
        return routes;
    },
    defaults: {
        priority: 1,
        lastmod: new Date().toISOString(),
    },
};
export default sitemap;