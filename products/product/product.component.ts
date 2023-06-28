import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';

import { ProductService } from '../../services/inventories/product.service';
import { I18nService } from 'src/app/services/translations/i18n.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  currentLanguage: string = 'pt'; // idioma padrão
  productForm!: FormGroup;
  productId: number = 0;

  constructor(
    public i18nService: I18nService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute) {}

  // INTERNACIONALIZACAO
  changeLanguage(language: string, event: Event): void {
    event.preventDefault();
    this.i18nService.setCurrentLanguage(language);
  }

  getTranslation(key: string): string {
    return this.i18nService.getTranslation(key);
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required]
    });

    // Verificar se há um productId fornecido na rota
    this.route.params.subscribe(params => {
      this.productId = +params['id']; // O "+" converte o parâmetro para número
      if (this.productId) {
        this.loadProduct();
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.value;
      if (this.productId) {
        productData.id = this.productId; // Definir o ID do produto na edição
        this.productService.updateProduct(productData).subscribe(
          {
            next:(updatedProduct: Product) => {
              // Lógica adicional após a edição do produto
            console.log('Produto atualizado:', updatedProduct);
            this.resetForm();
            },
            error: (error: any) => {
              // Tratamento de erros durante a atualização do produto
              console.error('Erro ao atualizar o produto:', error);
            }
          }
        );
      } else {
        this.productService.createProduct(productData).subscribe(
          {
            next: (createdProduct: Product) => {
              // Lógica adicional após o cadastro do produto
              console.log('Produto cadastrado:', createdProduct);
              this.resetForm();
            },
            error: (error: any) => {
              // Tratamento de erros durante o cadastro do produto
              console.error('Erro ao cadastrar o produto:', error);
            }
          }
        );
      }
    }
  }

  loadProduct(): void {
    this.productService.getProduct(this.productId).subscribe(
      {
        next: (product: Product) => {
          this.productForm.patchValue(product);
        },
        error: (error: any) => {
          // Tratamento de erros ao carregar o produto
          console.error('Erro ao carregar o produto:', error);
        }
      }
    );
  }

  deleteProduct(): void {
    if (this.productId) {
      this.productService.deleteProduct(this.productId).subscribe(
        () => {
          console.log('Produto excluído com sucesso');
          this.resetForm();
        },
        (error) => {
          console.error('Erro ao excluir o produto:', error);
        }
      );
    }
  }

  // limpar formulário
  resetForm(): void {
    this.productForm.reset();
  }

}
