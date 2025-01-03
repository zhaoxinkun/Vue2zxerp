/**
 * #递归路由方法
 * 传入两个参数
 * @param RouterData {Object}  --this is 路由的树形数据
 * @param targetArray {Array} 我们自己创建的需要往里添加的home的children数组
 * */
export function initRouter(RouterData, targetArray) {
    RouterData.forEach(item => {
        // 创建路由对象
        const routerObj = {
            path: item.url, // 路由的路径
            name: item.name, // 路由的名称
            //路由元信息
            meta: {
                breadcrumb: item.title // 面包屑
            },
            component: () => import(`@/views/Home/${item.component}/index.vue`), // 路由组件
        };

        // 判断是否是根级路由还是子路由
        if (Array.isArray(targetArray)) {
            // 如果是根级路由，直接添加
            targetArray.push(routerObj);
        } else {
            // 如果是子路由，确保 targetArray 有 children 属性
            if (!targetArray.children) {
                targetArray.children = [];
            }
            // 将 routesObj 添加到子路由的 children 中
            targetArray.children.push(routerObj);
        }

        // 如果当前路由项有子路由，递归处理
        if (item.children) {
            initRouter(item.children, routerObj);
        }
    });
}
