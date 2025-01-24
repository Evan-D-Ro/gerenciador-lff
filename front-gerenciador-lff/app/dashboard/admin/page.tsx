import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function CustomersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usuários do sistema.</CardTitle>
        <CardDescription>Configure aqui as permissões dos funcionários e administradores do sistema.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
