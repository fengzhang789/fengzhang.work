import { GitHubDark, LinkedIn } from 'developer-icons';

export default function Home() {
  const blogPosts = [
    {
      title: "Diving into distributed systems at AWS",
      date: "coming soon",
      link: "#"
    },
    {
      title: "Building and travelling the world with ETHGlobal",
      date: "coming soon",
      link: "#"
    },
    {
      title: "Write optimized key-value databases: Memtables",
      date: "coming soon",
      link: "#"
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
        <div className="space-y-12">
          {/* Header Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-serif font-medium tracking-tight text-gray-900">
              Hi, I&apos;m Feng
            </h1>
            <p className="text-lg text-gray-600">
              I&apos;m a Computer Science student at the University of Waterloo. I&apos;m currently working as a SDE intern at{' '}
              <a href="https://aws.amazon.com/dynamodb/" className="text-blue-600 hover:text-blue-800 hover:underline">AWS DynamoDB</a>, and I&apos;ve
              previously worked at{' '}
              <a href="https://ethglobal.com" className="text-blue-600 hover:text-blue-800 hover:underline">ETHGlobal</a> and{' '}
              <a href="https://habtech.ca" className="text-blue-600 hover:text-blue-800 hover:underline">Habtech Communications</a>.
            </p>
          </div>

          {/* About Section */}
          <div className="space-y-2">
            <p className="text-lg text-gray-600">
              I&apos;m passionate about everything related to databases and distributed
              systems. I&apos;m currently building my own key value database, NexusKV. In my free
              time, I go to the gym, cook, bake, occasionally read, and honestly, sleep a lot. I&apos;ve
              also been trying to get into playing volleyball recently.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a href="https://github.com/fengzhang789" className="text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-110">
              <span className="sr-only">GitHub</span>
              <GitHubDark className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com/in/fengzhang12" className="text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-110">
              <span className="sr-only">LinkedIn</span>
              <LinkedIn className="h-6 w-6" />
            </a>
          </div>

          {/* Key Values */}
          <div className='space-y-8'>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Core Values</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 pl-1">
              <li>Always be learning and growing, even if its by 1% a day</li>
              <li>Speed matters - ideate, build, and ship fast while producing high quality work (this site was built in 2 hours)</li>
              <li>You don&apos;t truly understand something until you can teach and build it</li>
              <li>Be someone you would want to work with</li>
            </ol>
          </div>

          {/* Blog Section */}
          <div>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Recent Writing</h2>
            <div className="space-y-3">
              {blogPosts.map((post) => (
                <a 
                  key={post.title}
                  href={post.link}
                  className="block group"
                >
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200">{post.title}</h3>
                    <span className="text-sm text-gray-400 ml-4 shrink-0">{post.date}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          {/* <div>
            <h2 className="text-2xl font-medium text-gray-900 mb-8">Projects</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}
