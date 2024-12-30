// 全局过滤器
export function statusFilter(val) {
    switch (val) {
        case 0:
            return "进件初始"
        case  1:
            return "提交一审"
        case  2:
            return "一审通过"
        case  3:
            return "一审拒绝"
        case  4:
            return "提交二审"
        case  5:
            return "二审通过"
        case  6:
            return "二审拒绝"
        case  7:
            return "提交终审"
        case  8:
            return "终审通过"
        case  9:
            return "终审拒绝"
        case  10:
            return "审批完成"
        case  11:
            return "生成凭证"
    }
}


export function statusStyle(val) {
    switch (val) {
        case 0:
            return "success"
        case  1:
            return "info"
        case  2:
            return "success"
        case  3:
            return "danger"
        case  4:
            return "info"
        case  5:
            return "success"
        case  6:
            return "danger"
        case  7:
            return "info"
        case  8:
            return "success"
        case  9:
            return "danger"
        case  10:
            return "success"
        case  11:
            return "warning"
    }
}


export function formatDate(value) {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleDateString(); // 或者使用其他格式化方法
}


//申请类别
export function categoryfilter(val) {  //
    switch (val) {
        case 1:
            return '办公审批';
        case 2:
            return '差旅审批';
        case 3:
            return '请假审批';
        default:
            return val;
    }
};

//申请类别 样式
export function categoryStyle(val) {  //
    switch (val) {
        case 1:
            return 'warning';
        case 2:
            return 'danger';
        case 3:
            return 'success';
        default:
            return val;
    }
};
