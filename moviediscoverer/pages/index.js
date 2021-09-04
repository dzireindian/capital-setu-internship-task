import { useRouter } from 'next/router';

export default function Home(){
    let router = useRouter();
    router.push("/login");

    return (<div class="text-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>)
}