var Model = {
    login: function(appId, perms) {
        return new Promise(function(resolve, reject) {
            VK.init({
                apiId: appId
            });

            VK.Auth.login(function(response) {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, perms);
        });
    },
    callApi: function(method, params) {
        return new Promise(function(resolve, reject) {
            VK.api(method, params, function(response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    console.dir(response.response);
                    resolve(response.response);
                }
            });
        });
    },
    getUser: function() {
        return this.callApi('users.get', {});
    },
    getMusic: function() {
        return this.callApi('audio.get', {});
    },
    getFriends: function() {
        return this.callApi('friends.get', { fields: 'photo_100, status' });
    },
    getRequestsFriends: function() {
        return this.callApi('friends.getRequests', {});
    },
    getNews: function() {

    var responsItems, responsGroups, responsProfiles, responsResultObj, responsResult;
        responsResultObj = {};
        responsResult = [];
       return this.callApi('newsfeed.get', { filters: 'post, photo', count: 100}).then(function( response ) {
            responsItems = response.items;
            responsGroups = response.groups;
            responsProfiles = response.profiles;
            //console.dir(response);
           console.dir(responsItems);
            //console.dir(responsGroups);
            //console.dir(responsProfiles);
            var ff =responsItems.map(function(item) {
                if (item.source_id < 0 )  {
                console.log("Это группа!!!");
                for (var key in responsGroups) {
                     if (responsGroups[key].gid === Math.abs(item.source_id) )  {
                        item.sourcename = responsGroups[key].name;
                        item.sourcephoto = responsGroups[key].photo;
                        }
                  }
                }
               else {
                    console.log("Это поользователь!!!");
                   for (var key2 in responsProfiles) {
                     if (responsProfiles[key2].uid === item.source_id)  {
                        item.first_name = responsProfiles[key2].first_name;
                        item.last_name = responsProfiles[key2].last_name;
                        item.sourcephoto = responsProfiles[key2].photo;
                        }
                  }
                }
                if ("attachment" in item && item.attachment.type === "photo") {
                    item.image = item.attachment.photo.src_big;
                }

                   console.log(item);
/*Обработка поля текст */
// преобразуем ссылки с помощью Regexp
var regHttp = /((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)/g;
  // item.text = item.text.replace(regHttp, '<a href="$1" target="_blank">$1</a>');
//удаляем хещ теги
var regHash = /(#[A-Za-z0-9-А-Яа-я_\/]*)/g;
  // item.text = item.text.replace(regHash, '');
//Обработка user
var regUser = /\[([A-Za-z0-9-_]+)\|([A-Za-z0-9-А-Яа-я_-]+)\]/g;
//item.text = item.text.replace(regUser, '<a href="'+ 'https://vk.com/$1' + '">' + '$2'+'</a>');
            return item;
});
console.dir(ff);












        //    for (var i = 0; i<responsItems.length; i++) {
        //        debugger;
        //         responsResultObj.postdate = responsItems[i].date;
        //         responsResultObj.text = responsItems[i].text;
        //         console.log(responsResultObj.postdate);
        //         console.log(i);
        //         console.log(responsResultObj);
        //         responsResult[responsResult.length] = responsResultObj;
        //        // responsResult.push(responsResultObj);
        //    }

            // for (var key in responsItems) {
            //     if (responsItems[key].source_id < 0 )  {
            //     console.log("Это группа!!!");
            //     for (var key2 in responsGroups) {
            //          if (responsGroups[key2].gid === Math.abs(responsItems[key].source_id) )  {
            //             responsResultObj.sourcename = responsGroups[key2].name;
            //             responsResultObj.sourcephoto = responsGroups[key2].photo;
            //             }
            //       }
            //     }
            //    else {
            //        for (var key2 in responsProfiles) {
            //          if (responsProfiles[key2].uid === responsItems[key].source_id)  {
            //             responsResultObj.first_name = responsProfiles[key2].first_name;
            //             responsResultObj.last_name = responsProfiles[key2].last_name;
            //             responsResultObj.sourcephoto = responsProfiles[key2].photo;
            //             }
            //       }
            //     }
            //     responsResultObj.postdate = responsItems[key].date;
            //     responsResultObj.text = responsItems[key].text;

            //     if ("attachment" in responsItems[key] && responsItems[key].attachment.type === "photo") {
            //         responsResultObj.image = responsItems[key].attachment.photo.src;
            //     }
            //        console.log(responsResultObj);

            //      //responsResult.push(responsResultObj);
            // }     

 //console.log(responsResult);
            return responsItems;
        });
    },
    getGroups: function() {
        return this.callApi('groups.get', {extended: 1});
    }
};
