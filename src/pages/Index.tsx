import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: 'online',
    message: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена!',
      description: 'Я свяжусь с вами в ближайшее время',
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      consultationType: 'online',
      message: '',
    });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-purple-100">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Психолог
            </h1>
            <div className="hidden md:flex gap-6">
              {['Главная', 'Обо мне', 'Услуги', 'Цены', 'Отзывы', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
            <Button onClick={() => scrollToSection('запись')}>Записаться</Button>
          </div>
        </nav>
      </header>

      <section id="главная" className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Путь к{' '}
                <span className="bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent">
                  гармонии
                </span>
                <br />
                начинается здесь
              </h2>
              <p className="text-xl text-muted-foreground">
                Профессиональная психологическая поддержка онлайн и в Москве. Помогу найти ответы на важные вопросы и обрести внутреннее равновесие.
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => scrollToSection('запись')} className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90">
                  Записаться на консультацию
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('услуги')}>
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-100">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: 'Heart', label: 'Поддержка', value: '24/7' },
                    { icon: 'Users', label: 'Клиентов', value: '500+' },
                    { icon: 'Award', label: 'Опыт', value: '10 лет' },
                    { icon: 'Star', label: 'Рейтинг', value: '5.0' },
                  ].map((stat, idx) => (
                    <Card key={idx} className="text-center border-purple-100">
                      <CardContent className="pt-6">
                        <Icon name={stat.icon as any} className="mx-auto mb-2 text-primary" size={32} />
                        <p className="text-3xl font-bold text-primary">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="обо-мне" className="py-20 px-6 bg-white/50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">Обо мне</h2>
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-accent rounded-full"></div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Я практикующий психолог с 10-летним опытом работы. Специализируюсь на когнитивно-поведенческой терапии, работе с тревожными расстройствами и кризисными состояниями. Верю, что каждый человек способен изменить свою жизнь к лучшему, и моя задача — помочь найти этот путь.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              {[
                { title: 'Образование', desc: 'МГУ, факультет психологии' },
                { title: 'Сертификаты', desc: 'КПТ, гештальт-терапия' },
                { title: 'Практика', desc: 'Более 2000 консультаций' },
              ].map((item, idx) => (
                <Card key={idx} className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="text-primary">{item.title}</CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="услуги" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Услуги</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Brain',
                title: 'Индивидуальная терапия',
                desc: 'Работа с личными запросами, тревогой, депрессией, самооценкой',
              },
              {
                icon: 'Briefcase',
                title: 'Карьерное консультирование',
                desc: 'Помощь в выборе профессии, борьба с выгоранием, поиск баланса',
              },
              {
                icon: 'Heart',
                title: 'Работа с отношениями',
                desc: 'Построение здоровых границ, проработка паттернов поведения',
              },
              {
                icon: 'Shield',
                title: 'Кризисная поддержка',
                desc: 'Помощь в сложных жизненных ситуациях, утрата, развод, болезнь',
              },
              {
                icon: 'Sparkles',
                title: 'Личностный рост',
                desc: 'Развитие потенциала, поиск смысла, достижение целей',
              },
            ].map((service, idx) => (
              <Card
                key={idx}
                className="border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent/50 flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} className="text-white" size={28} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="консультации" className="py-20 px-6 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Формат консультаций</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center mb-4">
                  <Icon name="Video" className="text-white" size={32} />
                </div>
                <CardTitle className="text-2xl">Онлайн консультации</CardTitle>
                <CardDescription className="text-base">
                  Встречи через Zoom, Skype или WhatsApp. Комфортно, удобно, конфиденциально. Подходит для жителей любых городов.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={20} />
                    <span>Из любой точки мира</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={20} />
                    <span>Гибкий график</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={20} />
                    <span>Запись сессии по запросу</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20 hover:border-accent transition-colors">
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-orange-400 flex items-center justify-center mb-4">
                  <Icon name="MapPin" className="text-white" size={32} />
                </div>
                <CardTitle className="text-2xl">Очные встречи</CardTitle>
                <CardDescription className="text-base">
                  Личные консультации в уютном кабинете в центре Москвы. Располагающая атмосфера для глубокой работы.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-accent" size={20} />
                    <span>Центр Москвы, м. Тверская</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-accent" size={20} />
                    <span>Комфортное пространство</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-accent" size={20} />
                    <span>Чай, кофе, вода</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="цены" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Цены</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Онлайн консультация',
                price: '3 500 ₽',
                duration: '60 минут',
                features: ['Zoom/Skype/WhatsApp', 'Гибкий график', 'Запись сессии'],
              },
              {
                title: 'Очная консультация',
                price: '5 000 ₽',
                duration: '60 минут',
                features: ['Центр Москвы', 'Уютный кабинет', 'Напитки включены'],
                featured: true,
              },
              {
                title: 'Пакет из 5 сессий',
                price: '18 000 ₽',
                duration: 'онлайн',
                features: ['Экономия 5%', 'Приоритет в записи', 'Поддержка между сессиями'],
              },
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`${
                  plan.featured
                    ? 'border-2 border-primary shadow-2xl scale-105'
                    : 'border-purple-100'
                } relative`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                    Популярное
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl mb-2">{plan.title}</CardTitle>
                  <div className="text-4xl font-bold text-primary mb-2">{plan.price}</div>
                  <CardDescription>{plan.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <Icon name="Check" className="text-primary" size={20} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-6"
                    variant={plan.featured ? 'default' : 'outline'}
                    onClick={() => scrollToSection('запись')}
                  >
                    Выбрать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="отзывы" className="py-20 px-6 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Отзывы клиентов</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Анна',
                text: 'Невероятно благодарна за помощь! За полгода работы я научилась справляться с тревогой и обрела уверенность в себе. Рекомендую всем, кто ищет профессионала.',
                rating: 5,
              },
              {
                name: 'Дмитрий',
                text: 'Работа с психологом помогла мне разобраться в семейных отношениях. Очень ценю деликатность и профессионализм. Онлайн формат оказался очень удобным.',
                rating: 5,
              },
              {
                name: 'Елена',
                text: 'Пришла с запросом по карьере, а получила гораздо больше. Открыла в себе новые стороны, поняла свои истинные желания. Спасибо за чуткое сопровождение!',
                rating: 5,
              },
            ].map((review, idx) => (
              <Card key={idx} className="border-purple-100">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-amber-400 fill-amber-400" size={20} />
                    ))}
                  </div>
                  <CardDescription className="text-base text-foreground/80 italic">
                    "{review.text}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-primary">— {review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="запись" className="py-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Запись на консультацию</h2>
            <p className="text-lg text-muted-foreground">
              Заполните форму, и я свяжусь с вами в течение 24 часов
            </p>
          </div>
          <Card className="border-purple-100 shadow-xl">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Как к вам обращаться?"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Формат консультации *</Label>
                  <RadioGroup
                    value={formData.consultationType}
                    onValueChange={(value) => setFormData({ ...formData, consultationType: value })}
                  >
                    <div className="flex items-center space-x-2 p-4 border border-purple-100 rounded-lg hover:bg-purple-50 transition-colors">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Icon name="Video" size={20} className="text-primary" />
                          <div>
                            <p className="font-semibold">Онлайн (3 500 ₽)</p>
                            <p className="text-sm text-muted-foreground">Zoom, Skype, WhatsApp</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border border-purple-100 rounded-lg hover:bg-purple-50 transition-colors">
                      <RadioGroupItem value="offline" id="offline" />
                      <Label htmlFor="offline" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Icon name="MapPin" size={20} className="text-accent" />
                          <div>
                            <p className="font-semibold">Очно в Москве (5 000 ₽)</p>
                            <p className="text-sm text-muted-foreground">м. Тверская, центр города</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Расскажите о запросе</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Опишите, с чем вы хотели бы поработать (необязательно)"
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-accent">
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="контакты" className="py-20 px-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle>Свяжитесь со мной</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Mail" className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">psycholog@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Phone" className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <p className="font-medium">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="MapPin" className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Адрес</p>
                    <p className="font-medium">Москва, ул. Тверская, 1</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle>Часы работы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Понедельник - Пятница</span>
                  <span className="font-medium">10:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Суббота</span>
                  <span className="font-medium">11:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Воскресенье</span>
                  <span className="font-medium">Выходной</span>
                </div>
                <div className="pt-4 border-t border-purple-100">
                  <p className="text-sm text-muted-foreground">
                    * Онлайн консультации доступны в удобное для вас время по предварительной записи
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-primary/10 to-accent/10 py-12 px-6">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Психолог
          </h3>
          <p className="text-muted-foreground mb-6">
            Профессиональная психологическая помощь онлайн и в Москве
          </p>
          <div className="flex justify-center gap-4 mb-6">
            {['instagram', 'facebook', 'linkedin'].map((social) => (
              <button
                key={social}
                className="w-10 h-10 rounded-full bg-white border border-purple-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <Icon name="Globe" size={20} />
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Все права защищены. Конфиденциальность гарантирована.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;