import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://functions.poehali.dev/465d2879-c05d-493f-8cbe-c3195b5bfeb3';

interface FinancialReport {
  id: number;
  date: string;
  operation_type: string;
  amount: number;
  description: string;
  category: string;
  created_at: string;
}

const Finance = () => {
  const [reports, setReports] = useState<FinancialReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    operation_type: 'income',
    amount: '',
    description: '',
    category: '',
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchReports = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setReports(data.reports || []);
    } catch (error) {
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить финансовые отчеты',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: formData.date,
          operation_type: formData.operation_type,
          amount: parseFloat(formData.amount),
          description: formData.description,
          category: formData.category,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Успешно!',
          description: 'Запись добавлена в финансовый отчет',
        });
        setFormData({
          date: new Date().toISOString().split('T')[0],
          operation_type: 'income',
          amount: '',
          description: '',
          category: '',
        });
        fetchReports();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось добавить запись',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Удалено',
          description: 'Запись удалена из отчета',
        });
        fetchReports();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить запись',
        variant: 'destructive',
      });
    }
  };

  const totalIncome = reports
    .filter((r) => r.operation_type === 'income')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpense = reports
    .filter((r) => r.operation_type === 'expense')
    .reduce((sum, r) => sum + r.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Финансовый отчет
              </h1>
            </div>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Icon name="TrendingUp" size={24} />
                Доходы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-700">{totalIncome.toFixed(2)} ₽</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Icon name="TrendingDown" size={24} />
                Расходы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-700">{totalExpense.toFixed(2)} ₽</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Icon name="Wallet" size={24} />
                Баланс
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {balance.toFixed(2)} ₽
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Все операции</CardTitle>
                <CardDescription>История финансовых операций</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Загрузка...</div>
                ) : reports.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Нет записей. Добавьте первую операцию.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Дата</TableHead>
                          <TableHead>Тип</TableHead>
                          <TableHead>Категория</TableHead>
                          <TableHead>Описание</TableHead>
                          <TableHead className="text-right">Сумма</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell>{new Date(report.date).toLocaleDateString('ru-RU')}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                  report.operation_type === 'income'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                <Icon
                                  name={report.operation_type === 'income' ? 'ArrowUp' : 'ArrowDown'}
                                  size={14}
                                />
                                {report.operation_type === 'income' ? 'Доход' : 'Расход'}
                              </span>
                            </TableCell>
                            <TableCell>{report.category}</TableCell>
                            <TableCell>{report.description}</TableCell>
                            <TableCell
                              className={`text-right font-semibold ${
                                report.operation_type === 'income' ? 'text-green-700' : 'text-red-700'
                              }`}
                            >
                              {report.operation_type === 'income' ? '+' : '-'}
                              {report.amount.toFixed(2)} ₽
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(report.id)}
                              >
                                <Icon name="Trash2" size={16} className="text-red-500" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Добавить операцию</CardTitle>
                <CardDescription>Внесите новую финансовую запись</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Дата *</Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="operation_type">Тип операции *</Label>
                    <Select
                      value={formData.operation_type}
                      onValueChange={(value) => setFormData({ ...formData, operation_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Доход</SelectItem>
                        <SelectItem value="expense">Расход</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Сумма *</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      required
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Категория</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Услуги, Реклама, и т.д."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Дополнительные детали"
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
