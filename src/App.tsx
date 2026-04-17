import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { products } from '@/lib/products'
import { Product, User, CartItem, ShippingAddress } from '@/lib/types'
import { ProductCard } from '@/components/ProductCard'
import { ProductDetailDialog } from '@/components/ProductDetailDialog'
import { CartSheet } from '@/components/CartSheet'
import { AuthDialog } from '@/components/AuthDialog'
import { CheckoutSheet } from '@/components/CheckoutSheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ShoppingCart, User as UserIcon, SignOut } from '@phosphor-icons/react'
import { Toaster, toast } from 'sonner'
import { motion } from 'framer-motion'

function App() {
  const [currentUser, setCurrentUser] = useKV<User | null>('current-user', null)
  const [users, setUsers] = useKV<User[]>('users', [])
  const [cart, setCart] = useKV<CartItem[]>('cart', [])
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showCart, setShowCart] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  const filteredProducts = categoryFilter === 'all' 
    ? products 
    : products.filter(p => p.category === categoryFilter)

  const totalItems = (cart || []).reduce((sum, item) => sum + item.quantity, 0)

  const handleAddToCart = (productId: string, quantity: number = 1) => {
    const product = products.find(p => p.id === productId)
    if (!product || !product.inStock) return

    setCart(currentCart => {
      const cartItems = currentCart || []
      const existingItem = cartItems.find(item => item.productId === productId)
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity
        if (newQuantity > 10) {
          toast.error('Maximum 10 items per product')
          return cartItems
        }
        toast.success('Cart updated')
        return cartItems.map(item =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      } else {
        toast.success('Added to cart')
        return [...cartItems, { productId, quantity }]
      }
    })
  }

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveFromCart(productId)
      return
    }
    setCart(currentCart =>
      (currentCart || []).map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.min(10, quantity) }
          : item
      )
    )
  }

  const handleRemoveFromCart = (productId: string) => {
    setCart(currentCart => (currentCart || []).filter(item => item.productId !== productId))
    toast.success('Removed from cart')
  }

  const handleLogin = (email: string, password: string) => {
    const user = (users || []).find(u => u.email === email && u.id === password)
    if (user) {
      setCurrentUser(user)
      setShowAuth(false)
      toast.success(`Welcome back, ${user.name}!`)
    } else {
      toast.error('Invalid credentials')
    }
  }

  const handleRegister = (email: string, password: string, name: string) => {
    const existingUser = (users || []).find(u => u.email === email)
    if (existingUser) {
      toast.error('Email already registered')
      return
    }

    const newUser: User = {
      id: password,
      email,
      name
    }

    setUsers(currentUsers => [...(currentUsers || []), newUser])
    setCurrentUser(newUser)
    setShowAuth(false)
    toast.success(`Welcome, ${name}!`)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    toast.success('Logged out successfully')
  }

  const handleCheckout = () => {
    if (!currentUser) {
      setShowCart(false)
      setShowAuth(true)
      toast.error('Please login to continue')
      return
    }
    setShowCart(false)
    setShowCheckout(true)
  }

  const handleCompleteOrder = (address: ShippingAddress) => {
    setCart([])
    setShowCheckout(false)
    toast.success('Order placed successfully!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <Toaster position="top-center" richColors />
      
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 h-16 flex items-center justify-between">
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
            Botanica Luxe
          </h1>
          
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {currentUser.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <SignOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAuth(true)}
                className="gap-2"
              >
                <UserIcon size={18} />
                <span className="hidden sm:inline">Login</span>
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCart(true)}
              className="relative gap-2"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <motion.div
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold"
                >
                  {totalItems}
                </motion.div>
              )}
              <span className="hidden sm:inline">Cart</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Organic Skincare Collection
          </h2>
          <p className="text-muted-foreground">
            Premium natural products for radiant, healthy skin
          </p>
        </div>

        <Tabs value={categoryFilter} onValueChange={setCategoryFilter} className="mb-8">
          <TabsList className="w-full sm:w-auto flex-wrap h-auto">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="cleanser">Cleansers</TabsTrigger>
            <TabsTrigger value="cream">Creams</TabsTrigger>
            <TabsTrigger value="moisturizer">Moisturizers</TabsTrigger>
            <TabsTrigger value="mask">Masks</TabsTrigger>
            <TabsTrigger value="toner">Toners</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={setSelectedProduct}
              />
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No products found in this category</p>
          </div>
        )}
      </main>

      <ProductDetailDialog
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        cart={cart || []}
      />

      <CartSheet
        open={showCart}
        onClose={() => setShowCart(false)}
        cart={cart || []}
        products={products}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <AuthDialog
        open={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <CheckoutSheet
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        cart={cart || []}
        products={products}
        onComplete={handleCompleteOrder}
      />
    </div>
  )
}

export default App