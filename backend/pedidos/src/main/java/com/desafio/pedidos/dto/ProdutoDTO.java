package com.desafio.pedidos.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class ProdutoDTO {
    
    private Long id;
    
    @NotBlank(message = "Nome do produto é obrigatório")
    private String nome;
    
    private String descricao;
    
    @NotNull(message = "Preço é obrigatório")
    @DecimalMin(value = "0.0", inclusive = true, message = "Preço deve ser maior ou igual a zero")
    private BigDecimal preco;
    
    @NotNull(message = "Quantidade em estoque é obrigatória")
    @Min(value = 0, message = "Quantidade em estoque deve ser maior ou igual a zero")
    private Integer quantidadeEmEstoque;
    
    @NotNull(message = "ID da categoria é obrigatório")
    private Long categoriaId;
    
    private String categoriaNome;
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    
    public BigDecimal getPreco() { return preco; }
    public void setPreco(BigDecimal preco) { this.preco = preco; }
    
    public Integer getQuantidadeEmEstoque() { return quantidadeEmEstoque; }
    public void setQuantidadeEmEstoque(Integer quantidadeEmEstoque) { 
        this.quantidadeEmEstoque = quantidadeEmEstoque; 
    }
    
    public Long getCategoriaId() { return categoriaId; }
    public void setCategoriaId(Long categoriaId) { this.categoriaId = categoriaId; }
    
    public String getCategoriaNome() { return categoriaNome; }
    public void setCategoriaNome(String categoriaNome) { this.categoriaNome = categoriaNome; }
}