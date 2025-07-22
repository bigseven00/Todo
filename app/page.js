import { List, Clock, Globe } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-400 to-green-500 text-white py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">TaskMaster</h1>
          <p className="text-xl mb-8">Organize Your Day with Ease</p>
          <Link
            href="/todo"
            className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TaskMaster?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4">
                <List className="w-12 h-12 mx-auto text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Task Organization</h3>
              <p>Manage your tasks with a simple and intuitive interface.</p>
            </div>
            <div className="text-center">
              <div className="mb-4">
                <Clock className="w-12 h-12 mx-auto text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Set Reminders</h3>
              <p>Never miss a deadline with timely reminders.</p>
            </div>
            <div className="text-center">
              <div className="mb-4">
                <Globe className="w-12 h-12 mx-auto text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Access Anywhere</h3>
              <p>Use TaskMaster on any device, anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}