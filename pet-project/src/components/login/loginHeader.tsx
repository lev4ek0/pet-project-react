import Image from 'next/image'

export default function LoginHeader() {
    return <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
            alt=""
            src="/next.svg"
            width={140}
            height={40}
            className="mx-auto h-10 w-auto"
            priority={true}
            style={{width:'140px', height: "40px" }}
        />

        <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Войти в аккаунт
        </h2>
    </div>
}