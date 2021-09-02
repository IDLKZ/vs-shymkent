export default function ({$auth,redirect}) {
  let roles = [4,5];
  if (!roles.includes($auth.user.user.role_id)){
    return redirect('/cabinet/settings')
  }

}
