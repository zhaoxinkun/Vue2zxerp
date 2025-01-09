const data =require('./data.js');

console.log(data)

function build(data, ParentId) {
    return data.filter(item => item.ParentId === ParentId)
        .map(area => {
            const children = build(data, area.AreaID); // 查找该地区的子地区
            return {
                value: area.AreaName2,
                label: area.AreaName,
                children: children.length > 0 ? children : undefined // 如果有子地区，则继续构建子树
            };
        });
}


const result = build(data, 1)

console.log(result)
