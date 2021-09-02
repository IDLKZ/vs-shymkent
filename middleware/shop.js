export default function ({$auth,redirect}) {
  let roles = [6,7];
  if (!roles.includes($auth.user.user.role_id)){
    return redirect('/cabinet/settings')
  }

}
