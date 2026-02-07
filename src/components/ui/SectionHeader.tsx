interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, centered = false }) => {
    return (
        <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
            {subtitle && (
                <span className="block text-orange-600 font-semibold tracking-wider text-sm uppercase mb-2">
                    {subtitle}
                </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {title}
            </h2>
            <div className={`h-1.5 w-24 bg-orange-500 rounded-full mt-4 ${centered ? 'mx-auto' : ''}`} />
        </div>
    );
};

export default SectionHeader;
