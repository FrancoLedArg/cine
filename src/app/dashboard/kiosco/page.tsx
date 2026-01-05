// Next
import Link from "next/link";
import Image from "next/image";

// Styles
import styles from "./styles.module.scss";

// Components
import QuickAction from "@/components/dashboard/kiosco/quick-actions";

// Actions
import { getAllProducts } from "@/actions/products";

export default async function Page() {
  // Acciones rápidas
  const quickActions = [
    {
      label: "Registrar Venta",
      icon: "/icons/cash-register.svg",
      href: "/dashboard/kiosco/ventas",
    },
    {
      label: "Escanear Venta",
      icon: "/icons/qr-code.svg",
      href: "/dashboard/kiosco/ventas",
    },
    {
      label: "Gestionar Stock",
      icon: "/icons/stack-plus.svg",
      href: "/dashboard/kiosco/ventas",
    },
  ];

  // Products
  const products = await getAllProducts();

  return (
    <main className={styles.main}>
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Acciones Rápidas */}
        <section className={styles.quick_actions}>
          <h2>Acciones Rapidas</h2>
          <div>
            {quickActions.map((action) => (
              <QuickAction key={action.label} {...action} />
            ))}
          </div>
        </section>

        {/* Productos */}
        <section className={styles.quick_actions}>
          <div>
            <h2>Productos</h2>

            <Link href="/dashboard/kiosco/productos">
              Ver Todos
              <Image
                src="/icons/caret-right.svg"
                alt="Caret Right"
                width={32}
                height={32}
              />
            </Link>
          </div>
          <div>
            {products.data && products.data.length > 0 ? (
              products.data.map((product) => (
                <div key={product.id}>
                  <p>{product.name}</p>
                  <p>{product.price}</p>
                  <p>{product.available_stock}</p>
                  <p>{product.stored_stock}</p>
                </div>
              ))
            ) : (
              <p>No hay productos</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
