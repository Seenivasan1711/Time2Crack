import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Cart')
@Controller('cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get user cart' })
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully' })
  async getUserCart(@Request() req) {
    return this.cartService.getUserCart(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, description: 'Item added to cart successfully' })
  async addToCart(@Request() req, @Body() addToCartDto: { productId: number; quantity: number }) {
    return this.cartService.addToCart(req.user.id, addToCartDto.productId, addToCartDto.quantity);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update cart item quantity' })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully' })
  async updateCartItem(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDto: { quantity: number }
  ) {
    return this.cartService.updateCartItem(req.user.id, parseInt(id), updateDto.quantity);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiResponse({ status: 200, description: 'Item removed from cart successfully' })
  async removeFromCart(@Request() req, @Param('id') id: string) {
    return this.cartService.removeFromCart(req.user.id, parseInt(id));
  }

  @Delete()
  @ApiOperation({ summary: 'Clear user cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared successfully' })
  async clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }
} 