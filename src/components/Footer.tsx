import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Product", "Company", "Resources", "Legal"].map((category) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">
                  {category}
                </h3>
                <ul className="mt-4 space-y-4">
                  {["Features", "Security", "Pricing", "Demo"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-base text-muted-foreground hover:text-foreground"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div> */}
        <Separator className="my-8" />
        <p className="text-center text-muted-foreground">
          © 2024 TutorEasy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
