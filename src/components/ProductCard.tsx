import { Product } from '@/lib/types'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
  onAddToCart: (productId: string) => void
  onViewDetails: (product: Product) => void
}

export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Card 
        className="h-full flex flex-col cursor-pointer hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-200"
        onClick={() => onViewDetails(product)}
      >
        <CardHeader className="p-0 relative">
          <div className="aspect-square overflow-hidden rounded-t-lg">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute top-2 left-2 flex gap-2">
            {product.isNew && (
              <Badge className="bg-accent text-accent-foreground">New</Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary" className="bg-muted text-muted-foreground">Out of Stock</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4 space-y-2">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
          <h3 className="font-display font-semibold text-lg leading-tight">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <p className="font-display font-semibold text-xl">₹{product.price}</p>
          <Button 
            size="sm"
            disabled={!product.inStock}
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart(product.id)
            }}
            className="gap-2"
          >
            <ShoppingCart size={16} weight="bold" />
            Add
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
