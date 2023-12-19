let scene = require('../model/dbModel')

// 增加场景
exports.addScene = function (req) {
  console.log("addScene req", req);
  // 创建文档并保存到数据库
  const newDocument = new scene(req);
  newDocument.save()
    .then(() => {
      console.log('Document inserted successfully!');
    })
    .catch((error) => {
      console.error('Error inserting document:', error);
    });
}

// 获取场景及其信息
let _idList = []
exports.getScene = async function (req, res) {
  const countResult = await getCount(); // 等待获取 count
  const documentResult = await getDocument(countResult); // 使用 count 获取 document 数据
  console.log("documentResult",documentResult);
  req.send(documentResult)
}

// 获取所有文档的数量
const getCount = async() => {
  let count 
  await scene.countDocuments({}, (err, countTmp) => {
    if (err) {
      console.error("Error:", err)
    } else {
      count = countTmp
    }
  });
  return count
}
// 获取一个文档
const getDocument = (count) => {
  return new Promise((resolve, reject) => {
    const random = Math.floor(Math.random() * count);
    scene.findOne().skip(random).exec((err, result) => {
      if (err) {
        reject(err);
      } else {
        let _idString = String(result._id);
        if (ifExitInList(_idString, count)) {
          resolve(result);
        } else {
          console.log("全部获取完毕");
          resolve(null); // 或者根据需求返回其他标识
        }
      }
    });
  });
};


// 判断该文档是否存在于_idList
const ifExitInList = (_idString,docCount) => {
  if (!_idList.includes(_idString)) {
    _idList.push(_idString); // 如果新值不在数组中，则添加
    return 1
  } else {
    console.log("该_id已经存在于数组中");
    //该_id已经存在于数组中，不需要添加
    //  判断是否获取完全部的了，没有就再获取一次
    if (_idList.length >= docCount) {
      console.log("_idList.length",_idList.length);
      console.log("docCount",docCount);
      console.log("判断出全部获取完毕");
      return 0
    } else {
        // 他妈的这里有bug啊 这里有时会走很多遍
      return getDocument(docCount);
    }
  }
}