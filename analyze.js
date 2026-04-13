const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const dir = path.join(process.cwd(), 'content', 'articles');
if (!fs.existsSync(dir)) {
  console.log("No articles directory found.");
  process.exit(0);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
const results = files.map(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf-8');
  const { data } = matter(content);
  return {
    slug: f.replace('.mdx', ''),
    title: data.title,
    pillar: data.topic_pillar,
    difficulty: data.difficulty,
    series: data.series_slug || null,
    order: data.series_order || null,
    prerequisites: data.prerequisites || []
  };
});

console.log(JSON.stringify(results, null, 2));
