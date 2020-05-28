export default function({ store, redirect }) {
  if(!store.user||!store.user.token||!store.user.user_id){
    redirect("/user/signin");
  }else{
    redirect("/");
  }
}
