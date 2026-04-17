import { CartItem, Product, ShippingAddress } from '@/lib/types'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Package, Check } from '@phosphor-icons/react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CheckoutSheetProps {
  open: boolean
  onClose: () => void
  cart: CartItem[]
  products: Product[]
  onComplete: (address: ShippingAddress) => void
}

export function CheckoutSheet({ open, onClose, cart, products, onComplete }: CheckoutSheetProps) {
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  })
  const [isSuccess, setIsSuccess] = useState(false)

  const cartWithProducts = cart.map(item => {
    const product = products.find(p => p.id === item.productId)
    return { ...item, product }
  }).filter(item => item.product) as (CartItem & { product: Product })[]

  const subtotal = cartWithProducts.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + shipping

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({
        fullName: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        phone: ''
      })
      onClose()
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display">Checkout</SheetTitle>
          <SheetDescription>Complete your order</SheetDescription>
        </SheetHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6"
              >
                <Check size={40} weight="bold" className="text-primary-foreground" />
              </motion.div>
              <h3 className="font-display text-2xl font-semibold mb-2">Order Placed!</h3>
              <p className="text-muted-foreground text-center">Thank you for your purchase</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <ScrollArea className="flex-1 -mx-6 px-6">
                <form onSubmit={handleSubmit} id="checkout-form" className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-display font-semibold">Order Summary</h4>
                    <div className="space-y-2">
                      {cartWithProducts.map(item => (
                        <div key={item.productId} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.product.name} × {item.quantity}
                          </span>
                          <span className="font-semibold">₹{item.product.price * item.quantity}</span>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-semibold">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-semibold">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="font-display font-semibold text-lg">Total</span>
                        <span className="font-display font-bold text-xl text-primary">₹{total}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-display font-semibold">Shipping Information</h4>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Street address"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          placeholder="Mumbai"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          placeholder="Maharashtra"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        placeholder="400001"
                        pattern="[0-9]{6}"
                      />
                    </div>
                  </div>
                </form>
              </ScrollArea>

              <div className="pt-4 border-t mt-6">
                <Button type="submit" form="checkout-form" className="w-full gap-2" size="lg">
                  <Package size={20} weight="bold" />
                  Place Order
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  )
}
