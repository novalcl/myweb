/**
 * @author: 魏冬冬 [1406282241@qq.com]
 * @description: 生成组件需要的数据
 * @param {Array} formData 数据源
 * @param {Array} fields 数据字段
 * @return Array 生成好的数据数组
 * @update:
 * @Date: 2019-06-10 11:09:43
 */
export const handleData = function (formData, fields, callBack) {
    let arr = [];
    let keys = Object.keys(fields);
    // console.log(keys)
    formData.forEach((element,key) => {
        // arr.push({
        //   title:element.title,
        //   img:element.img,
        //   link:element.href
        // })
        let map = {};
        keys.forEach((field) => {
            map[field] = element[fields[field]];
            callBack && callBack(map, element, key);
        });
        arr.push(map);
    });
    return arr;
}