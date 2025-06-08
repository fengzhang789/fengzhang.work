import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export default function ProjectCard({ title, description, imageUrl, link }: ProjectCardProps) {
  return (
    <a href={link} className="group block">
      <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover object-center transition-opacity group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </a>
  );
} 