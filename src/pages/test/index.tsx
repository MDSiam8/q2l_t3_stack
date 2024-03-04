import { api } from '~/utils/api'

export default function Test() {
    const { mutate } = api.user.userCreate.useMutation();
    mutate({ name: "User1"})
    
    //need to manage state
}