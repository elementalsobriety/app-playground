import { Info } from '@/ui/Info.server';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import {
  useHeaders,
  useCookies,
  usePreviewData,
} from 'next/dist/client/components/hooks-server';

const getDynamicCategories = () => [
  { slug: '', title: 'All' },
  { slug: 'phones', title: 'Phones' },
  { slug: 'tablets', title: 'Tablets' },
  { slug: 'watches', title: 'Watches' },
  { slug: 'laptops', title: 'Laptops' },
];

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = getDynamicCategories();

  return {
    props: {
      categories,
    },
  };
};

export default function Root({
  children,
  categories,
  ...props
}: {
  children: any;
  categories: ReturnType<typeof getDynamicCategories>;
}) {
  const headers = useHeaders();
  const cookies = useCookies();
  const previewData = usePreviewData();
  return (
    <Info
      path={['app', '(default)', 'categories']}
      kind="layout"
      type="server"
      data={{
        props,
        useHeaders: headers,
        useCookies: cookies,
        usePreviewData: previewData,
      }}
    >
      <div className="space-y-6">
        <div className="flex space-x-3">
          {categories.map(({ slug, title }) => (
            <div key={slug}>
              <Link href={`/categories/${slug}`}>{title}</Link>
            </div>
          ))}
        </div>

        {children}
      </div>
    </Info>
  );
}