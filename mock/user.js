const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}
export default [
    // user login
    {
        url: '/user/login',
        type: 'post',
        response: config => {
            const { username } = config.body
            const token = tokens[username]
  
            if (!token) {
                return {
                    code: 60204,
                    message: '账号：admin；密码：admin'
                }
            }
    
            return {
                code: 20000,
                data: token
            }
        }
    }
]