
import { signIn } from "@/auth"
 
export default function MS_Sign_In() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("azure-ad")
      }}
    >
      <button type="submit">Signin with Azure Active Directory</button>
    </form>
  )
} 