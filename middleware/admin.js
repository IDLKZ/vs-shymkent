export default function ({$auth}) {
    if ($auth.user.user.role_id == 1 || $auth.user.user.role_id == 2){
        $auth.logout();
       window.location.href = "https://jitsi.idl.kz/ru/login"
    }

}
