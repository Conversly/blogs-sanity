import Image from "next/image";
import Link from "next/link";
import { CalendarMonth } from "@mui/icons-material";

const CheckIcon = () => (
  <svg
    className="h-5 w-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="12" fill="#22c55e" fillOpacity="0.1" />
    <path
      d="M8 12L11 15L16 9"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function SidebarCTA() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
      <div className="overflow-hidden rounded-lg">
        <Image
          alt="AI Agent CTA"
          width={834}
          height={564}
          className="object-cover w-full h-auto"
          src="/image.png"
        />
      </div>
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold tracking-tight text-lg">
          AI Agent built in minutes
        </h3>
      </div>
      <div className="p-6 pt-0">
        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            <CheckIcon />
            <span className="text-sm text-gray-600">
              Connect to your data instantly
            </span>
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon />
            <span className="text-sm text-gray-600">
              Train with your content in clicks
            </span>
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon />
            <span className="text-sm text-gray-600">
              Handle 10X more customers
            </span>
          </li>
        </ul>
      </div>
      <div className="flex items-center p-6 pt-0">
        <Link
          href={`${process.env.NEXT_PUBLIC_VERLY_WEBSITE_URL}`}
          className="w-full"
        >
          <div className="relative mb-2 inline-block h-11 w-full">
            {/* Gradient shadow bottom */}
            <div
              className="absolute bottom-2 h-4 w-full translate-y-full rounded-b-lg"
              style={{
                background: "linear-gradient(to right, #fb923c, #f472b6, #e879f9)",
              }}
            />
            <button
              className="isolate relative flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 text-base font-medium text-white shadow-[0px_2px_0px_0px_#00000020_inset] transition-all duration-200 focus-visible:ring-[3px] focus-visible:ring-blue-300 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]"
              style={{
                background: "linear-gradient(to right, #fb923c, #f472b6, #e879f9)",
              }}
            >
              <CalendarMonth sx={{ fontSize: 18 }} />
              Build your agent for free
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
