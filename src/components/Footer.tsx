import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const teamMembers = [
    {
      name: "Shohruz Ernazarov",
      links: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/shohruz-ernazarov",
        },
        { name: "GitHub", url: "https://github.com/ShohruzE" },
      ],
    },
    {
      name: "Ynalois Pangilinan",
      links: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/ynalois-pangilinan",
        },
        { name: "GitHub", url: "https://github.com/ynaloisp" },
      ],
    },
    {
      name: "Nathan Vazquez",
      links: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/nathanrvazquez/",
        },
        { name: "GitHub", url: "https://github.com/NathanRVazquez" },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-lg font-semibold text-muted-foreground tracking-wider text-center">
          <p>Stay in contact with the team that made TutorEasy</p>
          <a
            href="https://linktr.ee/TutorEasy"
            className="text-blue-400 text-sm"
          >
            Our Linktree
          </a>
        </div>
        <div className="flex flex-cols-2 md:flex-cols-4 gap-8 mt-4 justify-center">
          {teamMembers.map((member) => (
            <div key={member.name}>
              <h3 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">
                {member.name}
              </h3>
              <ul className="mt-4 space-y-1 ">
                {member.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="my-8" />
        <p className="text-center text-muted-foreground">
          © 2024 TutorEasy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
