import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-amber-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl border-4 border-amber-400 text-center max-w-md w-full">
        <h1 className="text-3xl font-black text-amber-900 mb-2">Hana Hunt</h1>
        <p className="text-gray-600 mb-6 font-semibold">
          Petualangan Sinau Aksara lan Basa Jawa
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-md"
          >
            Mlebu (Login)
          </Link>
          <Link
            href="/regis"
            className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition shadow-md"
          >
            Daftar (Registrasi)
          </Link>
        </div>
      </div>
    </main>
  );
}
