/**
 *获得指定id的数据
 * @param id 查找的id
 * @return {Object} 满足条件的数据
 */
function getself(id){
	return data.list.filter(function(item){
		return item.id == id
	})[0];
}

/**
 *获得指定id的数据
 * @param id 查找的id
 * @return {Array}包含一级子数据的数组
 */
function getChildren(id){
	return data.list.filter(function(item){
		return item.pid == id
	});
}

/**
 *获得指定id的数据
 * @param id 查找的id
 * @return {Array} 包含一级父级数据的数组
 */
function getParent(id){
	var self = getself(id);
	if (self){
		return getself(self.pid);
	}
}
/**
 *获得指定id的数据
 * @param id 查找的id
 * @return {Array} 包含一级父级数据的数组
 */
function getParents(id){
	var parents = [];
	var parentInfo = getParent(id);
	if (parentInfo) {
		 parents.push(parentInfo);
		 var more = getParents(parentInfo.id);
		 parents = more.concat(parents);
	}
	return parents;
}
/**
 * 添加新数据
 */
function addData(newData) {
    newData.id = getMaxId() + 1;
    data.push(newData);
}
/*
 *获得删除后数据 
 */

function getdelete(id){
	return data.list.filter(function(item){
		return item.id !=id
	})
}
/**
 * 获取数组中最大的id
 */
function getMaxId() {
    var maxid = 0;
    data.list.forEach(function (item) {
        if (item.id > maxid) {
            maxid = item.id;
        }
    });
    return maxid;
}

function getChildrens(id,level){
	var level = level || 0;
	var children = getChildren(id);
	var data = [];
	children.forEach(function(value){
		value.level = level;
		data.push(value);
		data = data.concat( getChildrens(value.id,level+1) );
	});
	return data;
}

