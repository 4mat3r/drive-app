import { stackServerApp } from "@/stack";

export default  async function HomePage() {
    await stackServerApp.getUser({ or: 'redirect' });
	
    return <div> Hello, world! </div>;
}
