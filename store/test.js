import axios from "../plugins/axios";

export const state = () => ({
  item:1,
  data:[],
  current_page:1,
  last_page:1,
})

export const getters = {

  getItemPlusNumber(state,number){
    return state.item + number;
  }
}


export const mutations = {

    paginateWithFilter(state,data){
      state.data = data.data;
  },


}

export const actions = {
  async increment (context,myRequest) {
    let data;
    let url = myRequest.url + "?page="+myRequest.page;
    if(Object.keys(myRequest.params).length){
     for(let property in myRequest.params){
       url+="&" + "" + property + "" + "=" + ""+ myRequest.params[property] +"";
     }
    }
    try{
      await this.$axios.get(url).then((e)=>{
        data = e.data;
      }).catch((error)=>{
        console.log(error)
      });
    }
    catch (error){
      console.log(error)
    }
     context.commit('paginateWithFilter',data)
  }
}
