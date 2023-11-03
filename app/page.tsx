import Link from 'next/link';

export default function Home() {
  return (
    <main className="grid place-items-center h-screen">
      {/* Material Design Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-64 h-32 relative">
        <button className="bg-slate-500 hover:bg-slate-600 rounded-md px-1 absolute bottom-2 right-2">
          Save
        </button>
      </div>
    </main >
  );
}
