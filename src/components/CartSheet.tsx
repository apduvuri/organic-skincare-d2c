import { CartItem, Product } from '@/lib/types'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X, Minus, Plus, ShoppingBag } from '@phosphor-icons/react'

interface CartSheetProps {
  open: boolean
  onClose: () => void
  cart: CartItem[]
  products: Product[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
  onCheckout: () => void
}

export function CartSheet({ open, onClose, cart, products, onUpdateQuantity, onRemove, onCheckout }: CartSheetProps) {
  const cartWithProducts = cart.map(item => {
    const product = products.find(p => p.id === item.productId)
    return { ...item, product }
  }).filter(item => item.product) as (CartItem & { product: Product })[]

  const total = cartWithProducts.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  if (cart.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader>
            <SheetTitle className="font-display">Shopping Cart</SheetTitle>
            <SheetDescription>Your cart is empty</SheetDescription>
          </SheetHeader>
          <div className="flex-1 flex flex-col items-center justify-center py-12">
            <ShoppingBag size={64} weight="thin" className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-6">Add some products to get started</p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display">Shopping Cart</SheetTitle>
          <SheetDescription>{cart.length} {cart.length === 1 ? 'item' : 'items'}</SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6 my-6">
          <div className="space-y-4">
            {cartWithProducts.map(item => (
              <div key={item.productId} className="flex gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-semibold text-sm leading-tight truncate">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground uppercase">{item.product.category}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 flex-shrink-0"
                      onClick={() => onRemove(item.productId)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => onUpdateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => onUpdateQuantity(item.productId, Math.min(10, item.quantity + 1))}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                    <p className="font-display font-semibold">₹{item.product.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="space-y-4">
          <Separator />
          <div className="flex items-center justify-between">
            <span className="font-display font-semibold text-lg">Total</span>
            <span className="font-display font-bold text-2xl text-primary">₹{total}</span>
          </div>
          <Button className="w-full" size="lg" onClick={onCheckout}>
            Proceed to Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
