import AsyncStorage from "@react-native-community/async-storage";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    alert("Data Stored Successfully!");
  } catch (error)
  {
    alert(error);
  }
};

const storeDataJSON = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  
  } catch (error) {
    alert(error);
  }
};

const getData = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    if (data != null) {
      return data;
    } else {
      alert("No data with this key!");
    }
  } catch (error) {
    alert(error);
  }
};
const getDataJSON = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    if (data != null) {
      const jsonData = JSON.parse(data);
      return jsonData;
    } else {
      alert("No data with this key!");
    }
  } catch (error) {
    alert(error);
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    alert("Data Removed Successfully");
  } catch (error) {
    alert(error);
  }
};



const AddItem = async (key, item, type) => {
  try {

    var data = await AsyncStorage.getItem(key);

    if (data != null) {

      data = JSON.parse(data)
      let ary = data["post_comment"]


      var highestValue = 1; //keep track of highest value

      //loop through array of objects
      for (var i = 0, len = ary.length; i < len; i++) {
        var value = Number(ary[i]["id"]);
        if (value > highestValue) {
          highestValue = value;
        }
        let new_id = highestValue + 1

        let n = "{" + "\"id\"" + ":" + new_id + "," + "\"item\"" + ":" + JSON.stringify(item) + "}"
        n = JSON.parse(n)
        ary.push(n)
        data["post_comment"] = ary
        storeDataJSON(key, data)


        return data["post_comment"]


      }







    }



    else {
      item = { post_comment: [{ id: 1, item }] }
      storeDataJSON(key, item)
      return item["post_comment"]




    }

    alert("Data Added Successfully");
  } catch (error) {
    alert(error);
  }







}


const AddPost = async (key, item, type) => {
  try {

    var data = await AsyncStorage.getItem(key);

    if (data != null) {

      data = JSON.parse(data)
      console.log(data)
      let ary = data["post"]


      var highestValue = 1; //keep track of highest value

      //loop through array of objects

      let new_id =ary.length + 1

      let n = "{" + "\"id\"" + ":" + new_id + "," + "\"item\"" + ":" + JSON.stringify(item) + "}"
      n = JSON.parse(n)
      ary.push(n)
      data["post"] = ary
      storeDataJSON(key, data)


      return data["post"]










    }



    else {
      item = { post: [{ id: 1, item }] }
      storeDataJSON(key, item)
      return item["post"]




    }

    alert("Data Added Successfully");
  } catch (error) {
    alert(error);
  }

}















const AddNotification = async (key, item, type) => {
  try {

    var data = await AsyncStorage.getItem(key);

    if (data != null) {

      data = JSON.parse(data)
      console.log(data)
      let ary = data["Notification"]


      var highestValue = 1; //keep track of highest value

      //loop through array of objects

      let new_id =ary.length + 1

      let n = "{" + "\"id\"" + ":" + new_id + "," + "\"item\"" + ":" + JSON.stringify(item) + "}"
      n = JSON.parse(n)
      ary.push(n)
      data["Notification"] = ary
      storeDataJSON(key, data)


      return data["Notification"]










    }



    else {
      item = { Notification: [{ id: 1, item }] }
      storeDataJSON(key, item)
      return item["Notification"]




    }


  } catch (error) {
    alert(error);
  }










}


const fetchAllItems = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys()
    const items = await AsyncStorage.multiGet("postId")

    return items
  } catch (error) {
    console.log(error, "problemo")
  }
}
export { storeData, storeDataJSON, getData, getDataJSON, removeData, fetchAllItems, AddItem ,AddPost,AddNotification};
