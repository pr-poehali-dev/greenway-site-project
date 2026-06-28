import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/a128bd59-af98-4d03-8f34-f4c7e076c394/files/10a363eb-5e2f-4e39-bdb6-31a7256453ba.jpg';
const CRATE_IMG =
  'https://cdn.poehali.dev/projects/a128bd59-af98-4d03-8f34-f4c7e076c394/files/5414562d-6bf9-479c-8878-911bd8ede716.jpg';
const LOGO_IMG =
  'https://cdn.poehali.dev/projects/a128bd59-af98-4d03-8f34-f4c7e076c394/files/9cd07fff-4f25-44ae-aae0-7c190edbb8dc.jpg';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

const SEASONS: { id: Season; label: string; icon: string }[] = [
  { id: 'spring', label: 'Весна', icon: 'Sprout' },
  { id: 'summer', label: 'Лето', icon: 'Sun' },
  { id: 'autumn', label: 'Осень', icon: 'Leaf' },
  { id: 'winter', label: 'Зима', icon: 'Snowflake' },
];

interface Product {
  name: string;
  desc: string;
  price: string;
  oldPrice: string;
  icon: string;
  seasons: Season[];
  stock: 'in' | 'low' | 'out';
}

const PRODUCTS: Product[] = [
  {
    name: 'Еженедельная корзина',
    desc: 'Собранный набор сезонных овощей и фруктов для всей семьи. 10–15 позиций, меняется в зависимости от сезона.',
    price: '1 990 ₽',
    oldPrice: '2 490 ₽',
    icon: 'ShoppingBasket',
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    stock: 'in',
  },
  {
    name: 'Фермерский завтрак',
    desc: 'Набор для идеального утра: яйца, свежий хлеб, сыр, йогурт, мёд и сезонные ягоды.',
    price: '1 390 ₽',
    oldPrice: '1 690 ₽',
    icon: 'Egg',
    seasons: ['spring', 'summer', 'autumn'],
    stock: 'in',
  },
  {
    name: 'Детский набор',
    desc: 'Сбалансированный набор для здорового питания детей: фруктовое пюре, молоко, творог и полезные снеки.',
    price: '1 590 ₽',
    oldPrice: '1 990 ₽',
    icon: 'Baby',
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    stock: 'low',
  },
  {
    name: 'Суперфуд-бокс',
    desc: 'Набор из семян чиа, киноа, орехов, сушёных ягод и других суперфудов для энергии каждый день.',
    price: '1 890 ₽',
    oldPrice: '2 290 ₽',
    icon: 'Sparkles',
    seasons: ['autumn', 'winter'],
    stock: 'in',
  },
];

const STOCK_MAP = {
  in: { label: 'В наличии', color: 'bg-primary/10 text-primary', dot: 'bg-primary' },
  low: { label: 'Заканчивается', color: 'bg-accent/15 text-accent', dot: 'bg-accent' },
  out: { label: 'Нет в наличии', color: 'bg-muted text-muted-foreground', dot: 'bg-muted-foreground' },
};

const TEAM = [
  {
    name: 'Иван Петров',
    role: 'Основатель и CEO',
    bio: 'Фермер во втором поколении, агроном. Знает, как вырастить продукт без химикатов.',
    icon: 'Tractor',
  },
  {
    name: 'Мария Соколова',
    role: 'Шеф-повар и разработчик меню',
    bio: 'Составляет наборы, следит за их сбалансированностью и даёт советы по приготовлению.',
    icon: 'ChefHat',
  },
  {
    name: 'Алексей Романов',
    role: 'Руководитель логистики',
    bio: 'Организует самую быструю доставку, чтобы продукты попадали к вам максимально свежими.',
    icon: 'Truck',
  },
];

const ADVANTAGES = [
  { icon: 'ShieldCheck', title: 'Только проверенные фермеры', text: 'Работаем напрямую с хозяйствами, которые проверяем лично.' },
  { icon: 'Clock', title: 'Доставка в день заказа', text: 'Соберём и привезём корзину уже через 2 часа после заказа.' },
  { icon: 'Recycle', title: '100% экологичная упаковка', text: 'Никакого пластика — только перерабатываемые материалы.' },
];

const FAQ = [
  { q: 'Как быстро вы доставляете?', a: 'Доставляем в день заказа, обычно в течение 2 часов по Санкт-Петербургу. Доставка ежедневно с 07:00 до 23:00.' },
  { q: 'Откуда ваши продукты?', a: 'Все продукты — напрямую от проверенных фермерских хозяйств. Мы лично знакомы с каждым партнёром и контролируем качество.' },
  { q: 'Можно ли изменить состав корзины?', a: 'Да! Напишите нам пожелания при заказе, и наш шеф-повар Мария соберёт набор под вас.' },
  { q: 'Как стать фермером-партнёром?', a: 'Заполните форму обратной связи, выбрав тему «Хочу стать фермером-партнёром» — мы свяжемся с вами.' },
];

const BLOG = [
  { tag: 'Сезонное', title: '5 причин есть овощи по сезону', text: 'Почему сезонные продукты вкуснее, дешевле и полезнее.', icon: 'CalendarHeart' },
  { tag: 'Рецепты', title: 'Простой салат из фермерской зелени', text: 'Готовим за 10 минут из того, что в вашей корзине.', icon: 'Salad' },
  { tag: 'Здоровье', title: 'Как составить рацион для детей', text: 'Советы шеф-повара по детскому питанию.', icon: 'HeartPulse' },
];

const NAV = [
  { id: 'about', label: 'О нас' },
  { id: 'products', label: 'Товары' },
  { id: 'team', label: 'Команда' },
  { id: 'blog', label: 'Блог' },
  { id: 'faq', label: 'Вопросы' },
  { id: 'contacts', label: 'Контакты' },
];

export default function Index() {
  const [season, setSeason] = useState<Season>('summer');
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const visibleProducts = PRODUCTS.map((p) => ({
    ...p,
    available: p.seasons.includes(season),
  }));

  return (
    <div className="min-h-screen bg-background text-foreground font-body texture-paper">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container flex items-center justify-between h-20">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
            <img src={LOGO_IMG} alt="GreenWay" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-display text-3xl font-semibold tracking-tight text-primary">
              GreenWay
            </span>
          </button>
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('products')} className="hidden md:inline-flex rounded-full px-6">
            Заказать корзину
          </Button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} className="text-primary" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-3 animate-fade-up">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left py-2 text-foreground/80">
                {n.label}
              </button>
            ))}
            <Button onClick={() => scrollTo('products')} className="rounded-full mt-2">
              Заказать корзину
            </Button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="hero" className="relative overflow-hidden">
        <div className="container grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              <Icon name="Sparkles" size={15} /> Свежесть, проверенная временем
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[0.95] text-primary mb-6">
              Доставка свежих продуктов за&nbsp;2&nbsp;часа
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              Природа у вас дома. Экологически чистые овощи, фрукты и фермерские продукты напрямую от проверенных хозяйств.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => scrollTo('products')} size="lg" className="rounded-full px-8 text-base">
                Заказать корзину
                <Icon name="ArrowRight" size={18} className="ml-1" />
              </Button>
              <Button onClick={() => scrollTo('about')} variant="outline" size="lg" className="rounded-full px-8 text-base">
                О компании
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] rotate-3" />
            <img
              src={HERO_IMG}
              alt="Свежий урожай"
              className="relative rounded-[2rem] shadow-2xl w-full aspect-square object-cover"
            />
            <div className="absolute -bottom-5 -left-5 bg-card border border-border rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-accent/15 flex items-center justify-center">
                <Icon name="Truck" size={22} className="text-accent" />
              </div>
              <div>
                <p className="font-display text-2xl font-semibold leading-none text-primary">2 часа</p>
                <p className="text-xs text-muted-foreground">средняя доставка</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages / About */}
      <section id="about" className="py-20 bg-secondary/40">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <p className="text-accent font-medium mb-3 uppercase tracking-widest text-sm">Кратко о нас</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-4">
              Здоровое питание — доступно и удобно
            </h2>
            <p className="text-muted-foreground text-lg">
              GreenWay соединяет городских жителей с лучшими фермерскими хозяйствами, чтобы свежие и чистые продукты были у вас под рукой каждый день.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="bg-card rounded-2xl p-8 border border-border hover-scale">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon name={a.icon} size={26} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-primary mb-2">{a.title}</h3>
                <p className="text-muted-foreground">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products with seasonal filter */}
      <section id="products" className="py-20">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <p className="text-accent font-medium mb-3 uppercase tracking-widest text-sm">Наши наборы</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-3">
                Сезонные корзины
              </h2>
              <p className="text-muted-foreground text-lg">
                Состав и наличие меняются вместе с природой. Выберите сезон, чтобы увидеть, что доступно сейчас.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 p-1.5 bg-secondary/60 rounded-full self-start">
              {SEASONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSeason(s.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    season === s.id
                      ? 'bg-primary text-primary-foreground shadow'
                      : 'text-foreground/70 hover:text-primary'
                  }`}
                >
                  <Icon name={s.icon} size={16} />
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleProducts.map((p) => {
              const stockState = p.available ? p.stock : 'out';
              const stock = STOCK_MAP[stockState];
              return (
                <div
                  key={p.name}
                  className={`bg-card rounded-2xl border border-border p-6 flex flex-col transition-all ${
                    p.available ? 'hover-scale' : 'opacity-55'
                  }`}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon name={p.icon} size={24} className="text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      {p.available && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
                          Акция
                        </span>
                      )}
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${stock.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${stock.dot}`} />
                        {stock.label}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-primary mb-2">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-display text-2xl font-semibold text-primary">{p.price}</span>
                      {p.available && (
                        <span className="ml-2 text-sm text-muted-foreground line-through">{p.oldPrice}</span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      disabled={!p.available}
                      onClick={() => scrollTo('contacts')}
                      className="rounded-full"
                    >
                      {p.available ? 'В корзину' : 'Не сезон'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-secondary/40">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10 items-center mb-14">
            <div className="lg:col-span-2 max-w-xl">
              <p className="text-accent font-medium mb-3 uppercase tracking-widest text-sm">Наша команда</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary">
                Люди, которые заботятся о вашем столе
              </h2>
            </div>
            <img src={CRATE_IMG} alt="Фермерский ящик" className="rounded-2xl shadow-xl w-full aspect-video object-cover hidden lg:block" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TEAM.map((m) => (
              <div key={m.name} className="bg-card rounded-2xl p-8 border border-border text-center hover-scale">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Icon name={m.icon} size={34} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-primary">{m.name}</h3>
                <p className="text-accent font-medium text-sm mb-3">{m.role}</p>
                <p className="text-muted-foreground text-sm">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-20">
        <div className="container">
          <div className="max-w-xl mb-12">
            <p className="text-accent font-medium mb-3 uppercase tracking-widest text-sm">Блог</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary">
              Советы по здоровому питанию
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG.map((b) => (
              <article key={b.title} className="bg-card rounded-2xl border border-border overflow-hidden hover-scale cursor-pointer">
                <div className="h-40 bg-primary/10 flex items-center justify-center">
                  <Icon name={b.icon} size={48} className="text-primary/70" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-accent uppercase tracking-wider">{b.tag}</span>
                  <h3 className="font-display text-2xl font-semibold text-primary mt-2 mb-2">{b.title}</h3>
                  <p className="text-muted-foreground text-sm">{b.text}</p>
                  <span className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-4">
                    Читать <Icon name="ArrowRight" size={14} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-secondary/40">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-accent font-medium mb-3 uppercase tracking-widest text-sm">FAQ</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary">
              Частые вопросы
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-2xl px-6">
                <AccordionTrigger className="font-display text-xl font-medium text-primary hover:no-underline text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-20">
        <div className="container grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-accent font-medium mb-3 uppercase tracking-widest text-sm">Контакты</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-8">
              Свяжитесь с нами
            </h2>
            <div className="space-y-5 mb-8">
              {[
                { icon: 'Mail', label: 'Электронная почта', value: 'info@greenway.ru' },
                { icon: 'Phone', label: 'Телефон', value: '+7 (495) 111-22-33' },
                { icon: 'MapPin', label: 'Адрес', value: 'Санкт-Петербург, ул. Большая Зеленина, д. 10 (м. Чкаловская)' },
                { icon: 'Clock', label: 'Часы работы', value: 'Ежедневно с 07:00 до 23:00' },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{c.label}</p>
                    <p className="font-medium text-foreground">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden border border-border h-64">
              <iframe
                title="GreenWay на карте"
                src="https://yandex.ru/map-widget/v1/?ll=30.291%2C59.962&z=15&pt=30.291,59.962,pm2grm"
                width="100%"
                height="100%"
                frameBorder="0"
                className="grayscale-[0.2]"
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="font-display text-3xl font-semibold text-primary mb-6">Форма обратной связи</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Ваше имя" className="rounded-xl bg-background" />
                <Input placeholder="Телефон" className="rounded-xl bg-background" />
              </div>
              <Input type="email" placeholder="Email" className="rounded-xl bg-background" />
              <Select>
                <SelectTrigger className="rounded-xl bg-background">
                  <SelectValue placeholder="Тема вопроса" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="order">Вопрос по заказу</SelectItem>
                  <SelectItem value="partner">Хочу стать фермером-партнёром</SelectItem>
                  <SelectItem value="other">Иное</SelectItem>
                </SelectContent>
              </Select>
              <Textarea placeholder="Сообщение" rows={4} className="rounded-xl bg-background resize-none" />
              <Button type="submit" size="lg" className="w-full rounded-full text-base">
                Отправить
                <Icon name="Send" size={17} className="ml-1" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={LOGO_IMG} alt="GreenWay" className="w-9 h-9 rounded-full object-cover brightness-110" />
            <span className="font-display text-2xl font-semibold">GreenWay</span>
          </div>
          <p className="text-primary-foreground/70 text-sm">Природа у вас дома · © 2026 GreenWay</p>
          <div className="flex gap-3">
            {['Instagram', 'Send', 'Phone'].map((ic) => (
              <a key={ic} href="#" className="w-10 h-10 rounded-full bg-primary-foreground/15 flex items-center justify-center hover:bg-primary-foreground/25 transition-colors">
                <Icon name={ic} size={18} className="text-primary-foreground" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}