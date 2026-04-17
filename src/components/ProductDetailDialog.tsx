import { Product, CartItem } from '@/lib/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ShoppingCart, X } from '@phosphor-icons/react'
import { useState } from 'react'

interface ProductDetailDialogProps {
  product: Product | null
  open: boolean
  onClose: () => void
  onAddToCart: (productId: string, quantity: number) => void
  cart: CartItem[]
}

export function ProductDetailDialog({ product, open, onClose, onAddToCart, cart }: ProductDetailDialogProps) {
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const cartItem = cart.find(item => item.productId === product.id)
  const currentCartQuantity = cartItem?.quantity || 0

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity)
    setQuantity(1)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{product.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider">{product.category}</span>
            {product.isNew && <Badge className="bg-accent text-accent-foreground">New</Badge>}
            {!product.inStock && <Badge variant="secondary" className="bg-muted text-muted-foreground">Out of Stock</Badge>}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 pr-4">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <p className="text-foreground leading-relaxed">{product.description}</p>
              <p className="font-display font-semibold text-3xl text-primary">₹{product.price}</p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-display font-semibold text-lg">Key Benefits</h4>
              <ul className="space-y-1">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-display font-semibold text-lg">Key Ingredients</h4>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="outline" className="border-primary/30">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-display font-semibold text-lg">How to Use</h4>
              <p className="text-sm text-muted-foreground">{product.usage}</p>
            </div>
          </div>
        </ScrollArea>

        <div className="flex items-center gap-4 pt-4 border-t">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={!product.inStock}
            >
              -
            </Button>
            <span className="font-semibold w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              disabled={!product.inStock}
            >
              +
            </Button>
          </div>
          <Button 
            className="flex-1 gap-2"
            onClick={handleAddToCart}
            disabled={!product.inStock || (currentCartQuantity + quantity) > 10}
          >
            <ShoppingCart size={18} weight="bold" />
            {currentCartQuantity > 0 ? `Add More to Cart` : 'Add to Cart'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
