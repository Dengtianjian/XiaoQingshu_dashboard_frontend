export default function({ redirect,store }) {
  console.log(1);
  if(!store.user||!store.user.token||!store.user.user_id){
    redirect("/user/signin");
  }else{
    redirect("/");
  }
}
