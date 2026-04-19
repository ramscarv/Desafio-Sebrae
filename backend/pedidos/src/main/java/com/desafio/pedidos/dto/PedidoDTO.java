package com.desafio.pedidos.dto;


import jakarta.validation.constraints.NotEmpty;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PedidoDTO {
    
    private Long id;
    private LocalDateTime dataHora;
    
    @NotEmpty(message = "Pedido deve conter pelo menos um item")
    private List<PedidoItemDTO> itens = new ArrayList<>();
    
    private BigDecimal valorTotal;
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public LocalDateTime getDataHora() { return dataHora; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }
    
    public List<PedidoItemDTO> getItens() { return itens; }
    public void setItens(List<PedidoItemDTO> itens) { this.itens = itens; }
    
    public BigDecimal getValorTotal() { return valorTotal; }
    public void setValorTotal(BigDecimal valorTotal) { this.valorTotal = valorTotal; }
}